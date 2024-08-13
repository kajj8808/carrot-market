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
