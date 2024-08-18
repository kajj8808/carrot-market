"use client";
import getTweets, { Tweets } from "@/app/(tabs)/actions";
import { TWEETS_PER_PAGE } from "@/lib/constants";
import { formatToTimeAgo } from "@/lib/utils";
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddTweet from "./add-tweet";

export default function TweetList({
  initialTweets,
}: {
  initialTweets: Tweets;
}) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (page >= 0) {
        const tweets = await getTweets(page);
        if (tweets.length !== TWEETS_PER_PAGE) {
          setIsLastPage(true);
        } else {
          setIsLastPage(false);
        }
        setTweets(tweets);
      }
      setIsLoading(false);
    })();
  }, [page]);
  const nextPage = () => {
    if (page >= 0) {
      setPage((prev) => prev! + 1);
    } else {
      setPage(1);
    }
  };
  const prevPage = () => {
    if (page > 0) {
      setPage((prev) => prev! - 1);
    } else {
      setPage(0);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex h-[73dvh] flex-col gap-2 overflow-auto">
        {tweets.map((tweet) => (
          <Link
            href={`tweets/${tweet.id}`}
            key={tweet.id}
            className="flex flex-col gap-1 rounded-md border p-5"
          >
            <div className="flex items-center gap-1">
              <p className="font-medium">{tweet.user.username}</p>
              <p className="text-xs">·</p>
              <p className="text-xs">
                {formatToTimeAgo(tweet.created_at.toString())}
              </p>
            </div>
            <span className="line-clamp-2 h-14 text-sm">{tweet.tweet}</span>
            <div className="flex items-center gap-1">
              <div className="size-4">
                <HeartIcon />
              </div>
              <p className="text-sm">{tweet._count.likes}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        {page <= 0 ? (
          <div className="size-4" />
        ) : (
          <button onClick={prevPage} className="size-4">
            <ArrowLeftIcon />
          </button>
        )}
        <p className="flex w-6 select-none justify-center text-lg font-semibold">
          {page < 0 ? 0 : page}
        </p>
        {isLastPage ? (
          <div className="size-4" />
        ) : (
          <button onClick={nextPage} className="size-4">
            <ArrowRightIcon />
          </button>
        )}
      </div>
    </div>
  );
}
