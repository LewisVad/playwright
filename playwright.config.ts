import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    //{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    {
      name: 'public',
      testMatch: /vocea\.spec\.ts/,
    },
    {
      name: 'authenticated',
      testMatch: /auth\.spec\.ts/,
      dependencies: ['public'],
      use: {
        storageState: 'storage/auth.json',
      },
    },
    {
      name: 'dashboard',
      testMatch: /dashboard\.spec\.ts/,
      dependencies: ['authenticated'],
      use: {
        storageState: 'storage/auth.json',
      },
    },
  ],
});