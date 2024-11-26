import "@/styles/reset.css";
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";
import { QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppPropsWithLayout, getLayout } from "@/utils/getLayout";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: 0,
          },
        },
      }),
  );

  const Layout = getLayout(Component);

  return (
    <>
      <Head>
        <title>onef</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#fff",
                color: "#363636",
                fontWeight: "bold",
                fontFamily: "Pretendard",
                fontSize: "1.4rem",
              },
            }}
          />

          <Layout>
            <Component {...pageProps} />
          </Layout>

          <div style={{ fontSize: "2rem" }}>
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
