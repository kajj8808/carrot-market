"use client";
import { editUser } from "@/app/(tabs)/users/[username]/edit/actions";
import { useFormState } from "react-dom";
import EditInput from "./edit-input";
import EditButton from "./edit-button";
import { useEffect } from "react";

interface EditPasswordProps {
  defaultValue: { username: string; email: string; bio?: string };
}

export default function EditProfileForm({
  defaultValue: { email, username, bio },
}: EditPasswordProps) {
  const [state, trigger] = useFormState(editUser, null);

  useEffect(() => {
    if (state?.ok) {
      window.location.href = "/profile";
    }
  }, [state]);

  return (
    <form action={trigger} className="flex flex-col gap-3 pb-3">
      <h3 className="text-lg font-medium">프로필 수정</h3>
      <div className="flex flex-col gap-px">
        <label htmlFor="username">유저 이름</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          defaultValue={username}
          className="rounded-md border p-2.5 outline-none"
        />
        <span className="text-sm text-red-500">
          {state?.errors?.fieldErrors.username}
        </span>
      </div>

      <div className="flex flex-col gap-px">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          defaultValue={email}
          className="rounded-md border p-2.5 outline-none"
        />
        <span className="text-sm text-red-500">
          {state?.errors?.fieldErrors.email}
        </span>
      </div>
      <div className="flex flex-col gap-px">
        <label htmlFor="bio">자기소개</label>
        <input
          type="text"
          name="bio"
          id="bio"
          placeholder="bio"
          defaultValue={bio || ""}
          className="rounded-md border p-2.5 outline-none"
        />
        <span className="text-sm text-red-500">
          {state?.errors?.fieldErrors.bio}
        </span>
      </div>
      <EditButton text="저장하기" />
    </form>
  );
}
