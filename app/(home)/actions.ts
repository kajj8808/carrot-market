"use server";
export default async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  if (formData.get("password") === "12345") {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Wrong password",
    };
  }
}
