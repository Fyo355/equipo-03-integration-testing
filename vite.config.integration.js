import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: [...configDefaults.include, "**/*.integration-test.js"],
    exclude: [...configDefaults.exclude, "**/*.test.js"],
    exclude: [...configDefaults.exclude, "**/*e2e-test.js"],
  },
})
