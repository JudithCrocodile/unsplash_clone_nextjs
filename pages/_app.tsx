import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@/styles/globals.css";
import '@/styles/all.scss'
import type { AppProps } from "next/app";
import Layout from '../components/layout'
import Button from '@mui/material/Button';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store'
import { PersistGate } from 'redux-persist/integration/react'
import Head from 'next/head';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {

  const getLayout = Component.getLayout ?? ((page) => <Layout>

    <Component {...pageProps} />;

  </Layout>)



  // return <ThemeProvider theme={theme}>

  //     <Layout>

  //       <Component {...pageProps} />;

  //     </Layout>    

  //   </ThemeProvider>

  return (
    <>
    <Head>
      <title>Unsplash</title>
      <meta name="description" content="Do-whatever-you-want free HD photos. Gifted by the world's most generous community of photographers."/>
      <meta property="og:title" content="Unsplash" />
      <meta property="og:description" content="Do-whatever-you-want free HD photos. Gifted by the world's most generous community of photographers." />
      <meta property="og:image" content="/unsplash_clone.png" />
      <meta name="twitter:card" content="Do-whatever-you-want free HD photos. Gifted by the world's most generous community of photographers." />
    </Head>
  <Provider store={store}>
    <PersistGate persistor={persistor}>

      <ThemeProvider theme={theme}>{
        getLayout(<Component {...pageProps} />)
      }</ThemeProvider>
    </PersistGate>
  </Provider>    
    </>
  )






}
