"use server";

import { revalidatePath } from "next/cache";

import { isDoneThisCycle, isInterval, nextStreak } from "@/lib/cycle";
import { startOfDay } from "@/lib/date";
import { isHoyoGame } from "@/lib/games";
import { isNewsType } from "@/lib/news";
import { prisma } from "@/lib/prisma";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function addChore(formData: FormData) {
  const game = formData.get("game");
  const name = text(formData, "name");
  const intervalDays = Number(text(formData, "intervalDays"));
  if (!isHoyoGame(game) || !name || !isInterval(intervalDays)) return;

  await prisma.chore.create({ data: { game, name, intervalDays } });
  revalidatePath("/");
}

export async function deleteChore(id: string) {
  await prisma.chore.delete({ where: { id } });
  revalidatePath("/");
}

export async function completeChore(id: string) {
  const chore = await prisma.chore.findUnique({ where: { id } });
  if (!chore || isDoneThisCycle(chore)) return;

  const now = new Date();
  const today = startOfDay(now);

  await prisma.$transaction([
    prisma.chore.update({
      where: { id },
      data: { lastDoneAt: now, streak: nextStreak(chore, now) },
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
  const title = text(formData, "title");
  const date = new Date(text(formData, "date"));
  const url = text(formData, "url");

  if (!isHoyoGame(game) || !isNewsType(type) || !title || Number.isNaN(date.getTime())) return;
  if (url && !/^https?:\/\//.test(url)) return;

  await prisma.news.create({ data: { game, type, title, date, url: url || null } });
  revalidatePath("/");
}

export async function deleteNews(id: string) {
  await prisma.news.delete({ where: { id } });
  revalidatePath("/");
}
