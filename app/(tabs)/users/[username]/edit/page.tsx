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
    <div className="flex flex-col gap-8">
      <form action={editUser} className="flex flex-col gap-3 pb-3">
        <h3 className="text-lg font-medium">프로필 수정</h3>
        <div className="flex flex-col gap-px">
          <label htmlFor="username">유저 이름</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            defaultValue={user.username}
            className="rounded-md border p-2.5 outline-none"
          />
        </div>
        <div className="flex flex-col gap-px">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            defaultValue={user.email}
            className="rounded-md border p-2.5 outline-none"
          />
        </div>
        <div className="flex flex-col gap-px">
          <label htmlFor="bio">자기소개</label>
          <input
            type="text"
            name="bio"
            id="bio"
            placeholder="bio"
            defaultValue={user.bio || ""}
            className="rounded-md border p-2.5 outline-none"
          />
        </div>
        <button className="rounded-md bg-red-500 p-3 font-medium text-white hover:bg-red-400">
          저장하기
        </button>
      </form>
      <form action={editPassword} className="flex flex-col gap-3 pb-3">
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

        <button className="rounded-md bg-red-500 p-3 font-medium text-white hover:bg-red-400">
          비밀번호 저장하기
        </button>
      </form>
    </div>
  );
}
