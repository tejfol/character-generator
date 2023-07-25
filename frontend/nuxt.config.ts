// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,

  modules: ["@nuxtjs/tailwindcss", "nuxt-icons", "@nuxtjs/fontaine"],

  runtimeConfig: {
    public: {
      $api: "http://localhost:3000/api",
      $static: "http://localhost:3000/static",
    },
  },

  css: ["@/assets/css/main.css"],

  build: {
    transpile: ["@yeger/vue-masonry-wall", "@headlessui/vue"],

    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  app: {
    head: {
      title: "Character generator 🗿",
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: true,
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Handjet:wght@400;600;700&display=swap",
        },
      ],
    },
  },
});
