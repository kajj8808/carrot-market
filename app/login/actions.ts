"use server";

// server action
export default async function handleForm(prevState: any, formData: FormData) {
  console.log(prevState);
  ("use server"); // 이 함수가 서버에서만 실행되도록 만들어줌.
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    errors: ["wrong password", "password too short "],
  };
}
