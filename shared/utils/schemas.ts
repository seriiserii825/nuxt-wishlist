import { z } from "zod";

export const wishlistSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),
});

export const giftSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be less than 200 characters" }),
  url: z
    .url({ protocol: /^https?$/ })
    .max(2000, { message: "URL must be less than 2000 characters" })
    .or(z.literal("").transform((value) => value || null)),
  price: z
    .number({ message: "Enter a number" })
    .int({ message: "Price must be an integer" })
    .positive({ message: "Price must be a positive number" })
    .max(1000000, { message: "Price must be less than 1,000,000" })
    .nullish()
    .transform((value) => value || null),
  note: z
    .string({ message: "Note must be a string" })
    .max(500, { message: "Note must be less than 500 characters" })
    .nullish()
    .transform((value) => value || null),
});

export type GiftFormState = z.input<typeof giftSchema>;
