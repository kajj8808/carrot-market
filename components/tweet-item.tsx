import Link from "next/link";
import LikeButton from "./like-button";
import { formatToTimeAgo } from "@/lib/utils";

interface TweetItemProps {
  id: number;
  username: string;
  created_at: Date;
  tweet: string;
  likes: number;
  isLiked: boolean;
}

export default function TweetItem({
  id,
  username,
  created_at,
  tweet,
  isLiked,
  likes,
}: TweetItemProps) {
  return (
    <Link
      href={`/tweets/${id}`}
      key={id}
      className="flex flex-col gap-1 border-b py-2"
    >
      <div className="flex items-center gap-1">
        <p className="font-medium">{username}</p>
        <p className="text-xs">·</p>
        <p className="text-xs">{formatToTimeAgo(created_at.toString())}</p>
      </div>
      <span className="line-clamp-2 h-14 text-sm">{tweet}</span>

      <LikeButton
        isLiked={isLiked}
        likeCount={likes}
        tweetId={id}
        small
        disabled
      />
    </Link>
  );
}
