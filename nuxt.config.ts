// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "nuxt-auth-utils"],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    // Session cookie is sealed with a secret derived from NUXT_APP_SECRET
    // (nuxt-auth-utils >= 0.6 ignores session.password).
    session: {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  compatibilityDate: "2025-07-15",
});
