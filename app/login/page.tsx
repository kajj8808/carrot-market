"use client";

import SocialLogin from "@/components/social-login";

import { useFormState } from "react-dom";
import login from "./actions";
import Input from "@/components/input";
import Button from "@/components/button";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function Login() {
  const [state, trigger] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={trigger} className="flex flex-col gap-3">
        <Input
          name="email"
          required
          type="email"
          placeholder="Email"
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          required
          type="password"
          placeholder="Password"
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />

        <Button text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
