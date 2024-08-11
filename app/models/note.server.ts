import type { User, Note, Retro } from "@prisma/client";

import { prisma } from "~/db.server";

export function getNote({
  id,
  userId,
}: Pick<Note, "id"> & {
  userId: User["id"];
}) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getRetro({
  retroId,
  userId,
}: Pick<Retro, "retroId"> & {
  userId: User["id"];
}) {
  return prisma.retro.findFirst({
    select: { retroId: true, title: true },
    where: { retroId, userId },
  });
}


export function getRetroListItems({ userId }: { userId: User["id"] }) {
  return prisma.retro.findMany({
    where: { userId },
    select: { retroId: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createNote({
  body,
  title,
  userId,
}: Pick<Note, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.note.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function createRetro({
  userId,
  title
  }: {
  userId: User["id"];
  } & Pick<Retro, "title">){
  return prisma.retro.create({
    data: {
      title,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}


export function getRetroCards({
  retroId,
}: Pick<Retro, "retroId">) {
  return prisma.retroCard.findMany({
    select: { body: true, retroColumn: true },
    where: { retroId },
  });
}


export function deleteNote({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }) {
  return prisma.note.deleteMany({
    where: { id, userId },
  });
}
