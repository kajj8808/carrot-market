import db from "@/lib/db";
import getSession from "@/lib/sessions";

async function getUser() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      username: true,
      bio: true,
      created_at: true,
    },
  });
  return user;
}

export default async function ProfilePage() {
  const user = await getUser();
  return (
    <div>
      <h1>{user?.username} Profile ~</h1>
    </div>
  );
}
