import TweetItem from "@/components/tweet-item";
import db from "@/lib/db";
import getSession from "@/lib/sessions";
import { formatToTimeAgo } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getCachedUser } from "./actions";
import Link from "next/link";

export default async function Users({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;
  const user = await getCachedUser(username);
  const session = await getSession();

  if (!username || !user) {
    return notFound();
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <h3>{user.bio}</h3>
      <h3>{formatToTimeAgo(user.created_at.toString())} 가입</h3>
      {session.id === user.id ? (
        <Link href={`${user.username}/edit`}>edit</Link>
      ) : null}
      {user.tweets.map((tweet) => (
        <div key={tweet.id}>{tweet.tweet}</div>
      ))}
    </div>
  );
}
