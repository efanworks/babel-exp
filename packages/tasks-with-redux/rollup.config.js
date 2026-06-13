import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.ts",
  external: (id) => !id.startsWith(".") && !id.startsWith("/"),
  output: [
    {
      dir: "dist/esm",
      format: "esm",
      preserveModules: false,
      preserveModulesRoot: "src",
      entryFileNames: "[name].mjs",
      sourcemap: true,
      sourcemapExcludeSources: false,
    },
    {
      dir: "dist/cjs",
      format: "cjs",
      preserveModules: false,
      preserveModulesRoot: "src",
      entryFileNames: "[name].cjs",
      sourcemap: true,
      sourcemapExcludeSources: false,
    },
  ],
  plugins: [
    resolve({ extensions: [".js", ".ts", ".tsx"] }),
    babel({
      extensions: [".js", ".ts", ".tsx"],
      presets: [
        "@babel/preset-env",
        "@babel/preset-typescript",
        ["@babel/preset-react", { runtime: "automatic" }],
      ],
      babelHelpers: "bundled",
    }),
  ],
};
