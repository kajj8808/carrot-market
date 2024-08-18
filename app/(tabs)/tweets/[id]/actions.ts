"use server";
import db from "@/lib/db";
import getSession from "@/lib/sessions";
import { sleep } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
import { resolve } from "path";

export async function getTweet(tweetId: number, userId: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id: tweetId,
    },
    select: {
      created_at: true,
      id: true,
      tweet: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  if (!tweet) {
    return notFound();
  }
  return tweet;
}

export async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

export async function getTweetResponses(tweetId: number) {
  const tweetResponses = await db.response.findMany({
    where: {
      tweetId,
    },
    orderBy: {
      updated_at: "desc",
    },
    select: {
      id: true,
      text: true,
      user: {
        select: {
          username: true,
        },
      },
      created_at: true,
    },
  });
  return tweetResponses;
}
export type TweetResponse = Prisma.PromiseReturnType<
  typeof getTweetResponses
>[0];
// type TweetResult = Prisma.PromiseReturnType<typeof getTweet>;
// export type TweetResponse = TweetResult["responses"][0];

export async function addResponse(tweetId: number, responseText: string) {
  const session = await getSession();
  await db.response.create({
    data: {
      text: responseText,
      tweetId,
      userId: session.id,
    },
    select: {
      id: true,
    },
  });
  revalidatePath(`/tweets/${tweetId}`);
}

export async function likeTweet(tweetId: number) {
  // await sleep(3);
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id,
      },
    });
    revalidateTag("like-status");
  } catch (error) {}
}
export async function disLikeTweet(tweetId: number) {
  // await sleep(3);
  const session = await getSession();

  try {
    await db.like.delete({
      where: {
        id: { tweetId, userId: session.id },
      },
    });
    revalidateTag("like-status");
  } catch (error) {}
}
