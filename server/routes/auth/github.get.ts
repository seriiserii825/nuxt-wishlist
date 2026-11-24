import { sendRedirect } from "nuxt/server";

export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        login: user.login,
        name: user.name || user.login,
        avatarUrl: user.avatar_url,
      },
    });
    return sendRedirect(event, "/lists");
  },
  async onError(event, { error }) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
