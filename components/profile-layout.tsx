import { formatToTimeAgo } from "@/lib/utils";
import { CalendarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { UserTweets } from "@/app/(tabs)/users/[username]/actions";
import TweetItem from "./tweet-item";
import getSession from "@/lib/sessions";

interface ProfileLayoutProps {
  userId: number;
  username: string;
  email: string;
  bio: string;
  created_at: Date;
  tweets: UserTweets;
}

export default async function ProfileLayout({
  userId,
  username,
  created_at,
  bio,
  email,
  tweets,
}: ProfileLayoutProps) {
  const session = await getSession();
  return (
    <div>
      <div className="flex flex-col gap-2 border-b pb-3">
        <div>
          <div className="flex justify-between">
            <h1 className="text-lg font-medium">{username}</h1>
            {userId === session.id && (
              <Link
                href={`/users/${username}/edit`}
                className="rounded-full border px-2 py-1 text-xs"
              >
                프로필 수정
              </Link>
            )}
          </div>
          <h3 className="text-sm text-neutral-500">{email}</h3>
        </div>
        <span className="text-sm">{bio}</span>
        <p className="flex gap-px text-sm text-neutral-500">
          <CalendarIcon className="size-5 text-neutral-500" />
          {formatToTimeAgo(created_at.toString() || "")}에 가입함
        </p>
      </div>
      {tweets.map((tweet) => (
        <TweetItem
          key={tweet.id}
          id={tweet.id}
          username={tweet.user.username}
          created_at={tweet.created_at}
          isLiked={tweet.likes.length > 0}
          likes={tweet._count.likes}
          tweet={tweet.tweet}
        />
      ))}
    </div>
  );
}
