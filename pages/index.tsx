import { useEffect } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { DataForPowerPages } from '../components/shared/components/Header'
import Layout from '../components/shared/components/Layout'
import WorkerDataProvider from '../components/BubbleChart/data/WorkerDataProvider'
import BubbleChart from '../components/BubbleChart/BubbleChart'

function gapiLoaded() {
  gapi.load('client', intializeGapiClient);
}
async function intializeGapiClient() {
  await gapi.client.init({
    apiKey: process.env.NEXT_PUBLIC_SHEETS_API_KEY || '',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  });
}

declare global {
  interface Window {
    tokenClient?: google.accounts.oauth2.TokenClient;
  }
}


function gisLoaded() {
  window.tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: process.env.NEXT_PUBLIC_SHEETS_CLIENT_ID || '',
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    callback: () => {},
  });
}

const loadScript = (url: string, cb: () => void) => {
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = url;
  script.onload = cb;
  document.body.appendChild(script);
}

const Home: NextPage = () => {
  useEffect(() => {
    loadScript('https://apis.google.com/js/api.js', gapiLoaded);
    loadScript('https://accounts.google.com/gsi/client', gisLoaded);
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Data for Power</title>
        <meta
          name="description"
          content="Created by Shay Culpepper for unionists everywhere"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout currentPage={DataForPowerPages.BUBBLE_CHART}>
        <WorkerDataProvider>
          <BubbleChart />
        </WorkerDataProvider>
      </Layout>
    </div>
  )
}

export default Home
