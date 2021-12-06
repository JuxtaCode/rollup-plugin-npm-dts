import sourcemaps from "rollup-plugin-sourcemaps";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import rollupNodePolyfills from "rollup-plugin-node-polyfills";
import json from "@rollup/plugin-json";
import { name, external, globals } from "./package";
import banner from "./banner";

const RESOLVE_EXTENSIONS = [".js", ".ts", ".tsx"];
const RESOLVE_EXTENSIONS_TS = [".ts", ".tsx"];

export default {
  input: "src/main.ts",
  external,
  output: ["umd", "iife", "esm", "cjs"].map((format) => ({
    file: `dist/${name}${format === "umd" ? "" : `.${format}`}.js`,
    exports: "named",
    sourcemap: true,
    globals,
    format,
    name,
    banner,
  })),
  plugins: [
    json(),
    babel({
      babelHelpers: "bundled",
      skipPreflightCheck: true,
      extensions: RESOLVE_EXTENSIONS_TS,
    }),
    nodeResolve({ preferBuiltins: false, extensions: RESOLVE_EXTENSIONS }),
    commonjs(),
    rollupNodePolyfills({
      sourceMap: true,
      include: "**/*.{js,cjs}",
    }),
    sourcemaps(),
  ],
};
