import { H3Event } from "h3";
import { and, eq } from "drizzle-orm";
import { getIdParam } from "~~/server/utils/params";

export async function requireOwnWishlist(event: H3Event) {
  const { user } = await requireUserSession(event);
  const id = getIdParam(event, "id");

  const wishlist = await db
    .select()
    .from(tables.wishlists)
    .where(and(eq(tables.wishlists.id, id), eq(tables.wishlists.userId, user.id)))
    .get();

  if (!wishlist) {
    throw createError({
      statusCode: 404,
      statusMessage: "Wishlist not found",
    });
  }
  return wishlist;
}

export async function requireWishlistBySlug(event: H3Event) {
  const slug = getRouterParam(event, "slug") ?? "";

  const wishlist = await db
    .select()
    .from(tables.wishlists)
    .where(eq(tables.wishlists.slug, slug))
    .get();

  if (!wishlist) {
    throw createError({
      statusCode: 404,
      statusMessage: "Wishlist not found",
    });
  }
  return wishlist;
}

export async function isWishlistOwner(event: H3Event, wishlist: { userId: number }) {
  const { user } = await getUserSession(event);
  return user?.id === wishlist.userId;
}
