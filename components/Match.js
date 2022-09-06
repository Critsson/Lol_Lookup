import React from "react"
import styles from "../styles/Match.module.css"
import Image from "next/image"

export default function Match(props) {

    const [matchInfo, setMatchInfo] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    let won;
    let participant;

    for (let i = 0; i < props.participants.length; i++) {
        if (props.participants[i].puuid === props.puuid) {
            won = props.participants[i].win
            participant = props.participants[i]
        }
    }

    React.useEffect(() => {
        setLoading(true)
        switch (props.queueId) {
            case 400:
                setMatchInfo({
                    participant: participant, won: won, participants: props.participants, gameDuration: `${Math.floor(props.gameDuration / 60)}m ${props.gameDuration % 60}s`,
                    gameType: props.gameType, mapId: props.mapId, gameMode: "Normal Draft"
                })
                break;
            case 420:
                setMatchInfo({
                    participant: participant, won: won, participants: props.participants, gameDuration: `${Math.floor(props.gameDuration / 60)}m ${props.gameDuration % 60}s`,
                    gameType: props.gameType, mapId: props.mapId, gameMode: "Ranked Solo"
                })
                break;
            case 430:
                setMatchInfo({
                    participant: participant, won: won, participants: props.participants, gameDuration: `${Math.floor(props.gameDuration / 60)}m ${props.gameDuration % 60}s`,
                    gameType: props.gameType, mapId: props.mapId, gameMode: "Normal Blind"
                })
                break;
            case 440:
                setMatchInfo({
                    participant: participant, won: won, participants: props.participants, gameDuration: `${Math.floor(props.gameDuration / 60)}m ${props.gameDuration % 60}s`,
                    gameType: props.gameType, mapId: props.mapId, gameMode: "Ranked Flex"
                })
                break;
            case 450:
                setMatchInfo({
                    participant: participant, won: won, participants: props.participants, gameDuration: `${Math.floor(props.gameDuration / 60)}m ${props.gameDuration % 60}s`,
                    gameType: props.gameType, mapId: props.mapId, gameMode: "ARAM"
                })
                break;
            default:
                setMatchInfo({
                    participant: participant, won: won, participants: props.participants, gameDuration: `${Math.floor(props.gameDuration / 60)}m ${props.gameDuration % 60}s`,
                    gameType: props.gameType, mapId: props.mapId, gameMode: "Not Supported"
                })
                break;
        }

        setLoading(false)

    }, [props.puuid])

    console.log(matchInfo)

    return (
        <>
            {loading ?
                <div>
                    Loading
                </div>
                :
                <div className={styles.match_container}>
                    <div className={styles.leftmost_container}>
                        <h3>{matchInfo.gameMode}</h3>
                        {matchInfo.won ? <h4 className={styles.victory}>Victory</h4> : <h4 className={styles.defeat}>Defeat</h4>}
                        <p>{matchInfo.gameDuration}</p>
                    </div>
                    <div className={styles.champion_container}>
                        {matchInfo.won ? <div className={styles.champion_icon_container_victory}>
                            <img className={styles.champion_icon} src={`/champion_icons/${matchInfo.participant.championName}.png`} />
                        </div> :
                            <div className={styles.champion_icon_container_defeat}>
                                <img className={styles.champion_icon} src={`/champion_icons/${matchInfo.participant.championName}.png`} />
                            </div>}
                        <div className={styles.summs_container}>
                            <div className={styles.summ_container}>
                                <Image src={`/../public/summoner_spells/${matchInfo.participant.summoner1Id}.png`} width={200} height={200} />
                            </div>
                            <div className={styles.summ_container}>
                                <Image src={`/../public/summoner_spells/${matchInfo.participant.summoner2Id}.png`} width={200} height={200} />
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}