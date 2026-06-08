import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "lib/vueComponents",
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/vueComponents/index.ts"),
      name: "EfanworksVueComponents",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
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
