import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Admin pages use async data-fetching inside useEffect — disable strict compiler rule
  {
    files: ["app/admin/**/*.tsx", "app/admin/**/*.ts"],
    rules: {
      "react-compiler/react-compiler": "off",
    },
  },
]);

export default eslintConfig;
