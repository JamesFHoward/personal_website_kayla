import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4173/personal_website_kayla/',
    supportFile: false,
    video: false,
  },
});
