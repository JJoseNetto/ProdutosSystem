import z from "zod";

export const UserSchema = z.object({
  name: z.string(),
  id: z.string(),
  email: z.string(),
});

export type TUserSchema = z.infer<typeof UserSchema>;
