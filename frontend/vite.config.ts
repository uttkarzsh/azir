import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  server: {
    fs: {
      allow: [
        "..", // allow parent directory
        path.resolve(__dirname, "../crates/azir_wasm/pkg"),
      ],
    },
  },
});