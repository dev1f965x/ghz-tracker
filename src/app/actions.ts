"use server";

import { prisma } from "@/lib/prisma";
import { daysSince, todayDateOnly } from "@/lib/cycle";
import { isHoyoGame } from "@/lib/games";
import { revalidatePath } from "next/cache";

export async function addChore(formData: FormData) {
  const game = formData.get("game");
  const name = formData.get("name");
  const intervalRaw = formData.get("intervalDays");
  if (typeof game !== "string" || !isHoyoGame(game)) return;
  if (typeof name !== "string" || name.trim() === "") return;

  const intervalDays = typeof intervalRaw === "string" ? parseInt(intervalRaw, 10) : 1;

  await prisma.chore.create({
    data: {
      game,
      name: name.trim(),
      intervalDays: Number.isFinite(intervalDays) && intervalDays > 0 ? intervalDays : 1,
    },
  });
  revalidatePath("/");
}

export async function deleteChore(id: string) {
  await prisma.chore.delete({ where: { id } });
  revalidatePath("/");
}

export async function completeChore(id: string) {
  const chore = await prisma.chore.findUnique({ where: { id } });
  if (!chore) return;

  const gap = daysSince(chore.lastDoneAt);
  if (gap < chore.intervalDays) return; // already done this cycle

  const missedCycle = chore.lastDoneAt !== null && gap >= chore.intervalDays * 2;
  const newStreak = !chore.lastDoneAt || missedCycle ? 1 : chore.streak + 1;

  const today = todayDateOnly();

  await prisma.$transaction([
    prisma.chore.update({
      where: { id },
      data: { lastDoneAt: new Date(), streak: newStreak },
    }),
    prisma.completion.upsert({
      where: { choreId_date: { choreId: id, date: today } },
      create: { choreId: id, date: today },
      update: {},
    }),
  ]);
  revalidatePath("/");
}

export async function addNews(formData: FormData) {
  const game = formData.get("game");
  const type = formData.get("type");
  const title = formData.get("title");
  const date = formData.get("date");
  const url = formData.get("url");

  if (
    typeof game !== "string" || !isHoyoGame(game) ||
    typeof type !== "string" || type.trim() === "" ||
    typeof title !== "string" || title.trim() === "" ||
    typeof date !== "string" || date.trim() === ""
  ) {
    return;
  }

  await prisma.news.create({
    data: {
      game,
      type: type.trim(),
      title: title.trim(),
      date: new Date(date),
      url: typeof url === "string" && url.trim() !== "" ? url.trim() : null,
    },
  });
  revalidatePath("/");
}

export async function deleteNews(id: string) {
  await prisma.news.delete({ where: { id } });
  revalidatePath("/");
}
