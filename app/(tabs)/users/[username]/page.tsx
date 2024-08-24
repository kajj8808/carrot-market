import TweetItem from "@/components/tweet-item";
import db from "@/lib/db";
import getSession from "@/lib/sessions";
import { formatToTimeAgo } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getCachedUser } from "./actions";
import Link from "next/link";
import ProfileLayout from "@/components/profile-layout";

export default async function Users({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;
  const user = await getCachedUser(username);

  if (!username || !user) {
    return notFound();
  }

  return (
    <div>
      <ProfileLayout
        userId={user.id}
        key={""}
        tweets={user.tweets}
        username={user?.username}
        email={user?.email}
        created_at={user?.created_at}
        bio={user?.bio || ""}
      />
    </div>
  );
}
