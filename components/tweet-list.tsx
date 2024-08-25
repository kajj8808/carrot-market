"use client";
import getTweets, { Tweets } from "@/app/(tabs)/(home)/actions";
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
import LikeButton from "./like-button";
import TweetItem from "./tweet-item";

export default function TweetList({
  userId,
  initialTweets,
}: {
  userId: number;
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
        const tweets = await getTweets(page, userId);
        if (tweets.length !== TWEETS_PER_PAGE) {
          setIsLastPage(true);
        } else {
          setIsLastPage(false);
        }
        setTweets(tweets);
      }
      setIsLoading(false);
    })();
  }, [page, userId]);
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
      <div className="flex h-[80dvh] flex-col gap-2 overflow-auto">
        {tweets.map((tweet) => (
          <TweetItem
            created_at={tweet.created_at}
            id={tweet.id}
            isLiked={tweet.likes.length > 0}
            likes={tweet._count.likes}
            tweet={tweet.tweet}
            username={tweet.user.username}
            key={tweet.id}
          />
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
