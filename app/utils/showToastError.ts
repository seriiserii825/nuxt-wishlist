/**
 * Show an error toast for an error caught from $fetch (or anything else).
 * The message comes from the API (`createError({ message })`) when there is one, otherwise `fallback`.
 */
export default function showToastError(error: unknown, fallback = "Something went wrong") {
  const message = (error as { data?: { message?: string } } | null)?.data?.message || fallback;

  useToast().add({ title: message, color: "error" });
}
