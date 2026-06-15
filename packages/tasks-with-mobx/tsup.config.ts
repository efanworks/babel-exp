import { defineConfig } from "tsup";

export default defineConfig(() => ({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  external: [
    "react",
    "react-dom",
    "mobx",
    "mobx-react-lite",
    "react-error-boundary",
  ],
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".cjs",
    };
  },
}));
