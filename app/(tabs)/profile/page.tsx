import getSession from "@/lib/sessions";
import { getCachedUser } from "../users/[username]/actions";
import { formatToTimeAgo } from "@/lib/utils";
import { CalendarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import TweetItem from "@/components/tweet-item";

export default async function ProfilePage() {
  const session = await getSession();
  const user = await getCachedUser(session.username);
  return (
    <div>
      <div className="flex flex-col gap-2 border-b pb-3">
        <div>
          <div className="flex justify-between">
            <h1 className="text-lg font-medium">{user?.username}</h1>
            <Link
              href={`/users/${user?.username}/edit`}
              className="rounded-full border px-2 py-1 text-xs"
            >
              프로필 수정
            </Link>
          </div>
          <h3 className="text-sm text-neutral-500">{user?.email}</h3>
        </div>
        <span className="text-sm">{user?.bio}</span>
        <p className="flex gap-px text-sm text-neutral-500">
          <CalendarIcon className="size-5 text-neutral-500" />
          {formatToTimeAgo(user?.created_at.toString() || "")}에 가입함
        </p>
      </div>

      {user?.tweets.map((tweet) => (
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
