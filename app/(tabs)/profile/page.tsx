import getSession from "@/lib/sessions";
import { getCachedUser } from "../users/[username]/actions";
import ProfileLayout from "@/components/profile-layout";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const session = await getSession();
  const user = await getCachedUser(session.username);
  if (!user) {
    return notFound();
  }
  return (
    <div>
      <ProfileLayout
        userId={user.id}
        key={""}
        tweets={user?.tweets}
        username={user?.username}
        email={user?.email}
        created_at={user?.created_at}
        bio={user?.bio || ""}
      />
    </div>
  );
}
