import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@/styles/globals.css";
import '@/styles/all.scss'
import type { AppProps } from "next/app";
import Layout from '../components/layout'
import Button from '@mui/material/Button';
import { Provider } from 'react-redux';
import { store } from '@/store'

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

  return <Provider store={store}>
    <ThemeProvider theme={theme}>{
      getLayout(<Component {...pageProps} />)
    }</ThemeProvider>

  </Provider>



}
