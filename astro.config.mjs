// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://jitwebservices.github.io',
  base: '/themoney-printingpress',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory'
  },
  vite: {
    plugins: [tailwindcss()],
  },
});