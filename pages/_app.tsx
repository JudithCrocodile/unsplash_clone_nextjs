import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@/styles/globals.css";
import '@/styles/all.scss'
import type { AppProps } from "next/app";
import Layout from '../components/layout'
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}>

      <Button variant="contained">Primary</Button>

      
      <Layout>

        <Component {...pageProps} />;
        
      </Layout>    

    </ThemeProvider>
  

  
  
  
}
