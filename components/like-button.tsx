"use client";

import { disLikeTweet, likeTweet } from "@/app/(tabs)/tweets/[id]/actions";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
  revalidateFn: (id: number) => Promise<void>;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
  revalidateFn,
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
    reducer(undefined);
    if (isLiked) {
      await disLikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
    revalidateFn(tweetId);
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-px *:text-neutral-600"
    >
      <div className="size-6">
        <HeartIcon />
      </div>
      <span>{state.likeCount}</span>
    </button>
  );
}
