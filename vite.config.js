import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "src/constants"),
      },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@api", replacement: path.resolve(__dirname, "src/api") },
      {
        find: "@contexts",
        replacement: path.resolve(__dirname, "src/contexts"),
      },
    ],
  },
});
