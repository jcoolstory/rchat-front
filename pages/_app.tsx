import { RecoilRoot } from "recoil";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

const queryClient = new QueryClient();
 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout || ((page) => page)
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;