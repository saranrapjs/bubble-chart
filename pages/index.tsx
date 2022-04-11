import type { NextPage } from 'next'
import Head from 'next/head'
import ChartCreater from '../components/BubbleChart/ChartCreater'
import styles from '../styles/Home.module.css'
import Header, {
  DataForPowerPages,
} from '../components/shared/components/Header'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header currentPage={DataForPowerPages.ABOUT} />

      <main className={styles.main}>
        <div className={styles.container}>
          <main className={styles.main}>
            <h1>Organized organizers</h1>
            <ChartCreater />
          </main>
          <footer className={styles.footer}></footer>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home
