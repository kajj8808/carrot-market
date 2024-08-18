"use server";
import { TWEETS_PER_PAGE } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/sessions";
import { Prisma } from "@prisma/client";

export default async function getTweets(page: number) {
  const session = await getSession();
  const tweets = await db.tweet.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      likes: {
        where: {
          userId: session.id,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
    skip: page * TWEETS_PER_PAGE,
    take: TWEETS_PER_PAGE,
  });

  return tweets;
}
export type Tweets = Prisma.PromiseReturnType<typeof getTweets>;
