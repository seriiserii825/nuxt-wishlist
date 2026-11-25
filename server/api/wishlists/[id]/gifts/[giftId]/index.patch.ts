import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const wishlist = await requireOwnWishlist(event);
  const giftId = getIdParam(event, "giftId");
  const gift = await readValidatedBody(event, giftSchema.parse);

  const updated = await db
    .update(tables.gifts)
    .set(gift)
    .where(and(eq(tables.gifts.wishlistId, wishlist.id), eq(tables.gifts.id, giftId)))
    .returning({ id: tables.gifts.id })
    .get();

  if (!updated) {
    throw createError({
      statusCode: 404,
      statusMessage: "Gift not found",
    });
  }
});
