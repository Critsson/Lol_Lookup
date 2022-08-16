import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.main_container}>
        <h1 className={styles.title}>LoL Lookup</h1>
        <form className={styles.main_form}>
          <input type="text" placeholder="Summoner Name..."></input>
          <button>Search</button>
        </form>
      </div>
    </div>
  )
}
