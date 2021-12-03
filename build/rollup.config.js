import sourcemaps from "rollup-plugin-sourcemaps";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import ts from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import rollupNodePolyfills from 'rollup-plugin-node-polyfills';
import json from '@rollup/plugin-json';
import { name, globals, external } from "./package";
import banner from "./banner";

globals.fs = "fs";
external.push("fs");

const RESOLVE_EXTENSIONS = ['.js', '.ts', '.tsx'];
const RESOLVE_EXTENSIONS_TS = [".ts", ".tsx"];

export default {
  input: "src/main.ts",
  output: ["umd", "iife", "esm", "cjs"].map((format) => ({
    file: `dist/${name}${format === "umd" ? "" : `.${format}`}.js`,
    exports: "named",
    sourcemap: true,
    format,
    globals,
    name,
    banner,
  })),
  plugins: [
    ts(),
    json(),
    nodeResolve({ preferBuiltins: false }),
    commonjs({extensions: RESOLVE_EXTENSIONS}),
    // babel({
    //   babelHelpers: "bundled",
    //   skipPreflightCheck: true,
    //   extensions: RESOLVE_EXTENSIONS_TS,
    // }),
    rollupNodePolyfills({
      sourceMap: true,
      include: '**/*.{js,cjs,ts,tsx}',
    }),
  //sourcemaps(),
  ]
};
