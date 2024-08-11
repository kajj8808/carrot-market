import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContet {
  id: number;
}

export default function getSession() {
  return getIronSession<SessionContet>(cookies(), {
    cookieName: "session_name",
    password: process.env.COOKIE_PASSWORD!,
  });
}
