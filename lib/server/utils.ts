import bcrypt from "bcrypt";
export async function hashPassword(password: string) {
  return bcrypt.hashSync(password, 5);
}
