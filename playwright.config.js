// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['list'], ['html']], 
  use: {
    trace: 'on-first-retry',  
  },
});