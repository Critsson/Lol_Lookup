import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from "react"
import LandscapeSharpIcon from '@mui/icons-material/LandscapeSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import Link from "next/link"

export default function Home() {

  const [searchText, setSearchText] = useState("")
  const [regionCounter, setRegionCounter] = useState("NA")
  const [openedModal, setOpenedModal] = useState(false)

  const updateText = (e) => {
    setSearchText(e.target.value)
  }

  const openModal = () => {
    setOpenedModal(true)
  }

  const closeModal = () => {
    setOpenedModal(false)
  }

  const updateRegion = (region) => {
    setRegionCounter(region)
    setOpenedModal(false)
  }

  return (
    <div>
      <Head>
        <title>Climb.GG - LoL Stats</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      <div className={styles.main_container}>
        {openedModal &&
          <div onClick={closeModal} className={styles.modal}>
            <div className={styles.modal_container}>
              <div className={styles.modal_header}>
                <p>Select a Region</p>
                <div className={styles.close_icon_container}>
                  <CloseSharpIcon className={styles.close_icon} onClick={closeModal} sx={{ fontSize: "1.2vw", color: "grey" }} />
                </div>
              </div>
              <div className={styles.modal_body}>
                <div className={styles.modal_region_container}>
                  <h1>AM</h1>
                  <h1>EU</h1>
                  <h1>AS</h1>
                  <h1>OC</h1>
                </div>
                <div className={styles.container_collection}>
                  <div className={styles.modal_regions_container}>
                    <div onClick={() => updateRegion("NA")} className={styles.modal_h3_container}>
                      <h3>NA</h3>
                    </div>
                    <div onClick={() => updateRegion("BR")} className={styles.modal_h3_container}>
                      <h3>BR</h3>
                    </div>
                    <div onClick={() => updateRegion("LAN")} className={styles.modal_h3_container}>
                      <h3>LAN</h3>
                    </div>
                    <div onClick={() => updateRegion("LAS")} className={styles.modal_h3_container}>
                      <h3>LAS</h3>
                    </div>
                  </div>
                  <div className={styles.modal_regions_container}>
                    <div onClick={() => updateRegion("EUW")} className={styles.modal_h3_container}>
                      <h3>EUW</h3>
                    </div>
                    <div onClick={() => updateRegion("EUNE")} className={styles.modal_h3_container}>
                      <h3>EUNE</h3>
                    </div>
                    <div onClick={() => updateRegion("RU")} className={styles.modal_h3_container}>
                      <h3>RU</h3>
                    </div>
                  </div>
                  <div className={styles.modal_regions_container}>
                    <div onClick={() => updateRegion("KR")} className={styles.modal_h3_container}>
                      <h3>KR</h3>
                    </div>
                    <div onClick={() => updateRegion("TR")} className={styles.modal_h3_container}>
                      <h3>TR</h3>
                    </div>
                    <div onClick={() => updateRegion("JP")} className={styles.modal_h3_container}>
                      <h3>JP</h3>
                    </div>
                  </div>
                  <div className={styles.modal_regions_container}>
                    <div onClick={() => updateRegion("OC")} className={styles.modal_h3_container}>
                      <h3>OC</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        <div className={styles.title_container}>
          <LandscapeSharpIcon className={styles.landslide} sx={{ fontSize: "8.5vw" }} />
          <h1 className={styles.title}>Climb.GG</h1>
        </div>
        <form className={styles.main_form}>
          <div className={styles.region_selector_container}>
            <div onClick={openModal} className={styles.p_container}>
              <p>{regionCounter}</p>
            </div>
          </div>
          <input onChange={(e) => updateText(e)} type="text" placeholder="Summoner Name..." value={searchText}/>
          <Link href={`/summoner/${regionCounter.toLowerCase()}/${searchText}`}>
            <button>Search</button>
          </Link>
        </form>
      </div>
    </div>
  )
}
