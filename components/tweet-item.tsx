import Link from "next/link";
import LikeButton from "./like-button";
import { formatToTimeAgo } from "@/lib/utils";

interface TweetItemProps {
  tweet: {
    id: number;
    user: {
      username: string;
    };
    created_at: Date;
    tweet: string;
    _count: {
      likes: number;
    };
    likes: {
      created_at: Date;
      userId: number;
      tweetId: number;
    }[];
  };
}

export default function TweetItem({ tweet }: TweetItemProps) {
  return (
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

      <LikeButton
        isLiked={tweet.likes.length > 0}
        likeCount={tweet._count.likes}
        tweetId={tweet.id}
        small
        disabled
      />
    </Link>
  );
}
