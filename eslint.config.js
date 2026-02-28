import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["node_modules", "dist"] },
  js.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      // Allow console.log/error — this is a CLI script
      "no-console": "off",
      // Ignore intentionally unused vars prefixed with _
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      // Don't require explicit return types everywhere — TypeScript infers them
      "@typescript-eslint/explicit-function-return-type": "off",
      // Allow non-null assertions where we know data exists
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
);
