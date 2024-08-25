import getSession from "@/lib/sessions";
import { getCachedUser } from "../actions";
import { notFound } from "next/navigation";
import { editPassword, editUser } from "./actions";
import EditPasswordForm from "@/components/edit-password-form";
import EditProfileForm from "@/components/edit-profile-form";

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
    <div className="flex flex-col gap-8">
      <EditProfileForm
        defaultValue={{
          email: user.email,
          username: user.username,
          bio: user.bio || "",
        }}
      />
      <EditPasswordForm />
    </div>
  );
}
