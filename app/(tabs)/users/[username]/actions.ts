"use server";
import db from "@/lib/db";
import getSession from "@/lib/sessions";
import { unstable_cache as nextCache } from "next/cache";

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
        },
      },
      bio: true,
      email: true,
    },
  });
  return user;
}

export async function getCachedUser(username: string) {
  const cachedUser = nextCache(getUser, [`/users/${username}`], {
    tags: [`user-${username}`],
  });
  const session = await getSession();
  return await cachedUser(username, session.id);
}
