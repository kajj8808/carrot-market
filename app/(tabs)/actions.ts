"use server";
import { TWEETS_PER_PAGE } from "@/lib/constants";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export default async function getTweets(page: number) {
  const tweets = await db.tweet.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          Like: true,
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
