import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist",
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "tasks-with-pinia",
      formats: ["es", "cjs"],
      fileName: "index",
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies ?? {})],
      output: {
        globals: {
          vue: "Vue",
        },
        exports: "named",
      },
    },
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".d.ts"],
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
