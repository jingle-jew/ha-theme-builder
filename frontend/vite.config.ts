import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  build: {
    outDir: fileURLToPath(
      new URL("../custom_components/ha_theme_builder/frontend", import.meta.url),
    ),
    emptyOutDir: true,
    sourcemap: false,
    lib: {
      entry: {
        "ha-theme-builder": fileURLToPath(new URL("./src/ha-theme-builder-panel.ts", import.meta.url)),
        "ha-theme-builder-fixes": fileURLToPath(new URL("./src/native-surface-fixes.ts", import.meta.url)),
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
  },
  server: {
    host: "127.0.0.1",
    port: 4173,
  },
});
