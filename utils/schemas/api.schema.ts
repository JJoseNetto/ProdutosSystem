import z from "zod";

export const ApiResponseSchema = <TObject extends z.core.$ZodShape>(
  data?: z.ZodObject<TObject>
) => {
  return z.object({
    message: z.string(),
    data,
    success: z.boolean(),
  });
};
