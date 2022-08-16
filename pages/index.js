import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from "react"
import LandscapeSharpIcon from '@mui/icons-material/LandscapeSharp';
import Link from "next/link"

export default function Home() {

  const [searchText, setSearchText] = useState("")

  const updateText = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <div>
      <Head>
        <title>Climb.GG - LoL Stats</title>
      </Head>
      <div className={styles.main_container}>
        <div className={styles.title_container}>
          <LandscapeSharpIcon className={styles.landslide} sx={{ fontSize: "8.5vw" }} />
          <h1 className={styles.title}>Climb.GG</h1>
        </div>
        <form className={styles.main_form}>
          <input onChange={(e) => updateText(e)} type="text" placeholder="Summoner Name..." value={searchText}></input>
          <Link href={`/summoner/${searchText}`}>
            <button>Search</button>
          </Link>
        </form>
      </div>
    </div>
  )
}
