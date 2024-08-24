"use server";
import db from "@/lib/db";
import getSession from "@/lib/sessions";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";
import { notFound } from "next/navigation";

async function getUser(username: string, userId: number) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      created_at: true,
      tweets: {
        select: {
          id: true,
          _count: {
            select: {
              responses: true,
              likes: true,
            },
          },
          likes: {
            where: {
              userId: userId,
            },
            select: {
              created_at: true,
              userId: true,
              tweetId: true,
            },
          },
          tweet: true,
          user: {
            select: {
              username: true,
            },
          },
          created_at: true,
        },
        orderBy: {
          created_at: "desc",
        },
      },
      bio: true,
      email: true,
    },
  });
  return user;
}

export type UserTweets = NonNullable<
  Awaited<ReturnType<typeof getUser>>
>["tweets"];

export async function getCachedUser(username: string) {
  // 임시..
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  if (!user) {
    return notFound();
  }
  const cachedUser = nextCache(getUser, [`/users/${username}`], {
    tags: [`user-${user.id}`],
  });
  const session = await getSession();
  return await cachedUser(username, session.id);
}
