import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// ⚠️ index.html → vite.html 로 이동:
// 루트의 index.html이 Next.js 빌드 이후 next start 시정적 파일로
// 서빙되어 App Router 페이지 대신 Vite SPA 쉘이 렬더링되는 문제를 수정.
export default defineConfig(({ mode }) => ({
  // Vite SPA 진입점을 vite.html로 지정
  root: '.',
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'vite.html'),
    },
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
