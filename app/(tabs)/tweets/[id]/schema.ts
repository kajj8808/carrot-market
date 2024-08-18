import { z } from "zod";

export const responseFormSchema = z.object({
  text: z.string().min(1, { message: "text는 필수입니다!" }),
});
export type ResponseFromData = z.infer<typeof responseFormSchema>;
