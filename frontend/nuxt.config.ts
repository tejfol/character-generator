// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "nuxt-icons", "@nuxtjs/fontaine"],

  runtimeConfig: {
    public: {
      $api: "http://localhost:3000/api",
    },
  },

  css: ["@/assets/css/main.css"],

  build: {
    transpile: ["@yeger/vue-masonry-wall"],

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
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap",
        },
      ],
    },
  },
});
