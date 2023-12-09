import { RecoilRoot } from "recoil";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <h1>head</h1>
      <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <h1>footer</h1>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
