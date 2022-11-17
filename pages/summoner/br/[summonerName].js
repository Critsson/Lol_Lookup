import React from "react"
import Head from "next/head"
import styles from "../../../styles/Summoner.module.css"
import homeStyles from '../../../styles/Home.module.css'
import Link from "next/link"
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import Solo from "../../../components/Solo.js"
import Flex from "../../../components/Flex.js"
import Match from "../../../components/Match.js"

export default function SummonerPage({ summonerData, rankData, matchesData, matchDataArray }) {

    const [searchText, setSearchText] = React.useState("")
    const [regionCounter, setRegionCounter] = React.useState("BR")
    const [openedModal,
        setOpenedModal] = React.useState(false)

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

    const rankElementArrayTracker = []

    let rankElementArray = rankData.map((rankedInfo) => {
        if (rankedInfo.queueType === "RANKED_SOLO_5x5") {
            rankElementArrayTracker.push("Solo")
            return <Solo key={rankedInfo.leagueId} exists={true} tier={rankedInfo.tier} leaguePoints={rankedInfo.leaguePoints} rank={rankedInfo.rank} wins={rankedInfo.wins} losses={rankedInfo.losses} />
        } else if (rankedInfo.queueType === "RANKED_FLEX_SR") {
            rankElementArrayTracker.push("Flex")
            return <Flex key={rankedInfo.leagueId} exists={true} tier={rankedInfo.tier} leaguePoints={rankedInfo.leaguePoints} rank={rankedInfo.rank} wins={rankedInfo.wins} losses={rankedInfo.losses} />
        } else {
            return <></>
        }
    })


    if (rankElementArrayTracker.includes("Solo") && rankElementArrayTracker.includes("Flex")) {
        if (rankElementArrayTracker.indexOf("Solo") > rankElementArrayTracker.indexOf("Flex")) {
            const temp = rankElementArray[rankElementArrayTracker.indexOf("Solo")]
            rankElementArray[rankElementArrayTracker.indexOf("Solo")] = rankElementArray[rankElementArrayTracker.indexOf("Flex")]
            rankElementArray[rankElementArrayTracker.indexOf("Flex")] = temp
        }
    }

    if (!rankElementArrayTracker.includes("Solo")) {
        rankElementArray.unshift(<Solo />)
    }

    if (!rankElementArrayTracker.includes("Flex")) {
        rankElementArray.push(<Flex />)
    }

    console.log(matchDataArray)

    return (
        <>
            <Head>
                <title>{`${summonerData.name} - Summoner Stats`}</title>
            </Head>
            <div className={styles.main_container}>
                <Link href="/">
                    <HomeSharpIcon className={styles.home_button} sx={{ fontSize: "3vw", color: "#FB3640", position: "absolute", top: "1vw", right: "1vw" }} />
                </Link>
                {openedModal &&
                    <div onClick={closeModal} className={homeStyles.modal}>
                        <div className={homeStyles.modal_container}>
                            <div className={homeStyles.modal_header}>
                                <p>Select a Region</p>
                                <div className={homeStyles.close_icon_container}>
                                    <CloseSharpIcon className={homeStyles.close_icon} onClick={closeModal} sx={{ fontSize: "1.2vw", color: "grey" }} />
                                </div>
                            </div>
                            <div className={homeStyles.modal_body}>
                                <div className={homeStyles.modal_region_container}>
                                    <h1>AM</h1>
                                    <h1>EU</h1>
                                    <h1>AS</h1>
                                    <h1>OC</h1>
                                </div>
                                <div className={homeStyles.container_collection}>
                                    <div className={homeStyles.modal_regions_container}>
                                        <div onClick={() => updateRegion("NA")} className={homeStyles.modal_h3_container}>
                                            <h3>NA</h3>
                                        </div>
                                        <div onClick={() => updateRegion("BR")} className={homeStyles.modal_h3_container}>
                                            <h3>BR</h3>
                                        </div>
                                        <div onClick={() => updateRegion("LAN")} className={homeStyles.modal_h3_container}>
                                            <h3>LAN</h3>
                                        </div>
                                        <div onClick={() => updateRegion("LAS")} className={homeStyles.modal_h3_container}>
                                            <h3>LAS</h3>
                                        </div>
                                    </div>
                                    <div className={homeStyles.modal_regions_container}>
                                        <div onClick={() => updateRegion("EUW")} className={homeStyles.modal_h3_container}>
                                            <h3>EUW</h3>
                                        </div>
                                        <div onClick={() => updateRegion("EUNE")} className={homeStyles.modal_h3_container}>
                                            <h3>EUNE</h3>
                                        </div>
                                        <div onClick={() => updateRegion("RU")} className={homeStyles.modal_h3_container}>
                                            <h3>RU</h3>
                                        </div>
                                    </div>
                                    <div className={homeStyles.modal_regions_container}>
                                        <div onClick={() => updateRegion("KR")} className={homeStyles.modal_h3_container}>
                                            <h3>KR</h3>
                                        </div>
                                        <div onClick={() => updateRegion("TR")} className={homeStyles.modal_h3_container}>
                                            <h3>TR</h3>
                                        </div>
                                        <div onClick={() => updateRegion("JP")} className={homeStyles.modal_h3_container}>
                                            <h3>JP</h3>
                                        </div>
                                    </div>
                                    <div className={homeStyles.modal_regions_container}>
                                        <div onClick={() => updateRegion("OC")} className={homeStyles.modal_h3_container}>
                                            <h3>OC</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className={styles.container}>
                    <form className={homeStyles.main_form}>
                        <div className={homeStyles.region_selector_container}>
                            <div onClick={openModal} className={homeStyles.p_container}>
                                <p>{regionCounter}</p>
                            </div>
                        </div>
                        <input onChange={(e) => updateText(e)} type="text" placeholder="Summoner Name..." value={searchText} />
                        <Link href={`/summoner/${regionCounter.toLowerCase()}/${searchText}`}>
                            <button>Search</button>
                        </Link>
                    </form>
                    <div className={styles.top_container}>
                        <div className={styles.summoner_info_container}>
                            <div className={styles.level_container}>
                                <p>{summonerData.summonerLevel}</p>
                            </div>
                            <div className={styles.summoner_icon_container}>
                                <img alt="Summoner Icon" className={styles.summoner_icon} src={`/profile_icons/${summonerData.profileIconId}.png`} />
                            </div>
                            <div className={styles.name_update_container}>
                                <p>{summonerData.name}</p>
                                <button className={styles.update_button} onClick={() => window.location.reload()}>
                                    <BrowserUpdatedIcon sx={{ fontSize: "1.5vw", color: "#F3E9DC" }} />
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mid_container}>
                        <div className={styles.rank_container}>
                            {rankElementArray}
                        </div>
                        <div className={styles.matches_container}>
                            <Match region={regionCounter} gameDuration={matchDataArray[0].info.gameDuration} gameMode={matchDataArray[0].info.gameMode}
                                gameType={matchDataArray[0].info.gameType} mapId={matchDataArray[0].info.mapId} participants={matchDataArray[0].info.participants} puuid={summonerData.puuid}
                                queueId={matchDataArray[0].info.queueId} />
                            <Match region={regionCounter} gameDuration={matchDataArray[1].info.gameDuration} gameMode={matchDataArray[1].info.gameMode}
                                gameType={matchDataArray[1].info.gameType} mapId={matchDataArray[1].info.mapId} participants={matchDataArray[1].info.participants} puuid={summonerData.puuid}
                                queueId={matchDataArray[1].info.queueId} />
                            <Match region={regionCounter} gameDuration={matchDataArray[2].info.gameDuration} gameMode={matchDataArray[2].info.gameMode}
                                gameType={matchDataArray[2].info.gameType} mapId={matchDataArray[2].info.mapId} participants={matchDataArray[2].info.participants} puuid={summonerData.puuid}
                                queueId={matchDataArray[2].info.queueId} />
                            <Match region={regionCounter} gameDuration={matchDataArray[3].info.gameDuration} gameMode={matchDataArray[3].info.gameMode}
                                gameType={matchDataArray[3].info.gameType} mapId={matchDataArray[3].info.mapId} participants={matchDataArray[3].info.participants} puuid={summonerData.puuid}
                                queueId={matchDataArray[3].info.queueId} />
                            <Match region={regionCounter} gameDuration={matchDataArray[4].info.gameDuration} gameMode={matchDataArray[4].info.gameMode}
                                gameType={matchDataArray[4].info.gameType} mapId={matchDataArray[4].info.mapId} participants={matchDataArray[4].info.participants} puuid={summonerData.puuid}
                                queueId={matchDataArray[4].info.queueId} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export async function getServerSideProps({ params, res }) {

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=604800"
    )

    const { summonerName } = params
    const fixedSummonerName = summonerName.replaceAll(" ", "%20")
    const summonerResponse = await fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${fixedSummonerName}?api_key=${process.env.RIOT_API}`)
    const summonerData = await summonerResponse.json()
    const matchesResponse = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerData.puuid}/ids?start=0&count=5&api_key=${process.env.RIOT_API}`)
    const matchesData = await matchesResponse.json()
    const rankResponse = await fetch(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}?api_key=${process.env.RIOT_API}`)
    const rankData = await rankResponse.json()
    const matchDataArray = matchesData.map(async (match) => {
        const response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${process.env.RIOT_API}`)
        const data = await response.json()
        return data
    })

    console.log("SUMMONER DATA:")
    console.log(summonerData)
    console.log("MATCHES DATA:")
    console.log(matchesData)
    console.log("RANK DATA:")
    console.log(rankData)
    console.log("MATCH DATA ARRAY: ")
    console.log(matchDataArray)

    return {
        props: {
            summonerData: summonerData,
            matchesData: matchesData,
            rankData: rankData,
            matchDataArray: await Promise.all(matchDataArray)
        }
    }
}