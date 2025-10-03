import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { SITE_URL } from "./src/data/config";
//import vercel from '@astrojs/vercel/serverless';
import vercel from '@astrojs/vercel/static';


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), robotsTxt()],
  site: SITE_URL,
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark"
      },
      wrap: true
    }
  },
  //output: 'server',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
});