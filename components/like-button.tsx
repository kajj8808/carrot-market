"use client";

import { disLikeTweet, likeTweet } from "@/app/(tabs)/tweets/[id]/actions";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

import { startTransition, useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
  small?: boolean;
  disabled?: boolean;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
  small,
  disabled,
}: LikeButtonProps) {
  const [state, reducer] = useOptimistic(
    { isLiked, likeCount },
    (prevState, payload) => {
      return {
        isLiked: !prevState.isLiked,
        likeCount: prevState.isLiked
          ? prevState.likeCount - 1
          : prevState.likeCount + 1,
      };
    },
  );
  async function onClick() {
    startTransition(() => {
      reducer(undefined);
    });

    if (isLiked) {
      await disLikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center gap-1 *:transition-colors *:hover:text-red-500 disabled:-z-10 ${isLiked ? "*:text-red-500" : "*:text-neutral-500 *:hover:text-neutral-500"} disabled:cursor-default`}
    >
      <div className={small ? "size-4" : "size-5"}>
        {isLiked ? <HeartIcon /> : <OutlineHeartIcon />}
      </div>
      <span className="text-sm">{state.likeCount}</span>
    </button>
  );
}
