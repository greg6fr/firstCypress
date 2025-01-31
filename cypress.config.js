const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'yd1hmi',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://practice.expandtesting.com/notes/app",
    viewportHeight: 720,
    viewportWidth: 1280,
    videosFolder: "cypress/videos",
    video: true,
    screenshotsFolder: "cypress/screenshots",
  },
});
