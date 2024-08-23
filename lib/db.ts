import { PrismaClient } from "@prisma/client";
import { fakeTweets } from "@/app/data/fakedata";

const db = new PrismaClient();

async function createFakeTweets() {
  await db.tweet.createMany({
    data: fakeTweets,
  });
}
// createFakeTweets();
export default db;

export async function checkEmail(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  // user가 있으면 false 없으면 true -> zod
  return !Boolean(user);
}

export async function checkUsername(username: string) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  // user가 있으면 false 없으면 true -> zod
  return !Boolean(user);
}
