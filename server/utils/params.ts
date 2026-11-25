import type { H3Event } from "h3";
import { z } from "zod";

const idSchema = z.coerce.number().int().positive();

export function getIdParam(event: H3Event, name: string): number {
  const result = idSchema.safeParse(getRouterParam(event, name));

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid ${name} parameter`,
    });
  }
  return result.data;
}
