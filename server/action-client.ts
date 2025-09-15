import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import z from "zod";

export class ActionError extends Error {}

const getHeaders = async () => (await import("next/headers")).headers();

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e) {
    // console.error("Action error:", e.message);

    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(async ({ next, ctx }) => {
  // console.log("LOGGING MIDDLEWARE");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

  const headers = await getHeaders();

  // const startTime = performance.now();

  const result = await next({
    ctx: {
      ...ctx,
      apiUrl: API_BASE_URL,
      headers: {
        ...headers.values,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });

  // const endTime = performance.now();

  // console.log("Result ->", result);
  // console.log("Client input ->", clientInput);
  // console.log("Metadata ->", metadata);
  // console.log("Action execution took", endTime - startTime, "ms");

  return result;
});

export const authActionClient = actionClient.use(async ({ next, ctx }) => {
  const cookieStore = async () => (await import("next/headers")).cookies();
  const authCookie = (await cookieStore()).get("token")?.value;

  if (!authCookie) {
    throw new ActionError("Invalid Session");
  }

  const headers = {
    ...ctx.headers,
    Authorization: `Bearer ${authCookie}`,
  };

  return next({
    ctx: {
      ...ctx,
      headers,
    },
  });
});
