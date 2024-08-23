import getSession from "@/lib/sessions";
import { getCachedUser } from "../actions";
import { notFound } from "next/navigation";
import { editPassword, editUser } from "./actions";

export default async function UserEdit({
  params,
}: {
  params: { username: string };
}) {
  const user = await getCachedUser(params.username);
  const session = await getSession();

  if (user?.id !== session.id) {
    return notFound();
  }
  return (
    <div>
      <form action={editUser} className="flex flex-col gap-2">
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            defaultValue={user.username}
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            defaultValue={user.email}
          />
        </label>
        <label htmlFor="bio">
          <input
            type="text"
            name="bio"
            id="bio"
            placeholder="bio"
            defaultValue={user.bio || ""}
          />
        </label>

        <button>save</button>
      </form>
      <form action={editPassword}>
        <label htmlFor="old_password">
          <input
            type="password"
            name="old_password"
            id="old_password"
            placeholder="old_password"
          />
        </label>
        <label htmlFor="new_password">
          <input
            type="password"
            name="new_password"
            id="new_password"
            placeholder="new_password"
          />
        </label>
        <button>save password</button>
      </form>
    </div>
  );
}
