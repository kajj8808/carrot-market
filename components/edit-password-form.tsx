"use client";
import { useFormState } from "react-dom";
import EditButton from "./edit-button";
import { editPassword } from "@/app/(tabs)/users/[username]/edit/actions";
import { useEffect } from "react";

export default function EditPasswordForm() {
  const [state, trigger] = useFormState(editPassword, null);

  useEffect(() => {
    if (state?.ok) {
      window.location.href = "/log-in";
    }
  }, [state]);

  return (
    <form action={trigger} className="flex flex-col gap-3 pb-3">
      <h3 className="text-lg font-medium">비밀번호 변경</h3>
      <div className="flex flex-col gap-px">
        <label htmlFor="old_password">이전 비밀번호</label>
        <input
          type="password"
          name="old_password"
          id="old_password"
          placeholder="old_password"
          className="rounded-md border p-2.5 outline-none"
        />
      </div>
      <div className="flex flex-col gap-px">
        <label htmlFor="new_password">새로운 비밀번호</label>
        <input
          type="password"
          name="new_password"
          id="new_password"
          placeholder="new_password"
          className="rounded-md border p-2.5 outline-none"
        />
      </div>
      <EditButton text="비밀번호 저장하기" />
    </form>
  );
}
