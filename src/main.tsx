/**
 * src/main.tsx — Vite SPA 진입점
 * ─────────────────────────────────────────────────────────────────────────────
 * [TS Fix] import 경로에서 .tsx 확장자 제거:
 *   TypeScript 표준 모듈 해석 규칙 (moduleResolution: bundler / node16)에서
 *   import 경로에 .tsx 확장자를 명시하면 TS2835 에러 발생.
 *   → "./App.tsx" → "./App"
 */
import { createRoot } from 'react-dom/client';
import App from './App';   // [TS Fix] .tsx 확장자 제거
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
