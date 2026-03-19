// 이 파일은 Next.js Pages Router의 커스텀 App 컴포넌트입니다.
// 실제 앱은 App Router(src/app/))를 사용합니다.
// 이 파일은 Pages Router의 라우트 충돌을 방지하기 위해 존재합니다.
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
