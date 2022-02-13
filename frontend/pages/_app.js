import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import Layout from "../components/Layout";
import apolloClient from "../lib/apollo";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Food delivery</title>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </Head>
      {/* ApolloProvider is used for Client-side rendering */}
      {/* https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/ */}
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
