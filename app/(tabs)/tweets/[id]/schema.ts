import { z } from "zod";

export const responseFormSchema = z.object({
  text: z.string().min(1, { message: "response is required.!" }),
});
export type ResponseFromData = z.infer<typeof responseFormSchema>;
