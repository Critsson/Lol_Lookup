import React from "react"
import styles from "../styles/Match.module.css"
import Image from "next/image"

export default function Match(props) {

    const [matchInfo, setMatchInfo] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    let won;
    let participant;
    let kdaStyle;

    for (let i = 0; i < props.participants.length; i++) {
        if (props.participants[i].puuid === props.puuid) {
            won = props.participants[i].win
            participant = props.participants[i]
        }
    }

    if ((Math.round(((participant.kills + participant.assists) / participant.deaths) * 100) / 100) === Infinity) {
        kdaStyle = { color: "#FF9B1E", fontWeight: 600, fontSize: ".9vw" }
    } else if ((Math.round(((participant.kills + participant.assists) / participant.deaths) * 100) / 100) >= 5) {
        kdaStyle = { color: "#FF9B1E", fontWeight: 600, fontSize: ".9vw" }
    } else if ((Math.round(((participant.kills + participant.assists) / participant.deaths) * 100) / 100) >= 3) {
        kdaStyle = { color: "#18BD9B", fontWeight: 600, fontSize: ".9vw" }
    } else if ((Math.round(((participant.kills + participant.assists) / participant.deaths) * 100) / 100) > 0) {
        kdaStyle = { color: "white", fontWeight: 600, fontSize: ".9vw" }
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
            case 1400:
                setMatchInfo({
                    participant: participant, won: won, participants: props.participants, gameDuration: `${Math.floor(props.gameDuration / 60)}m ${props.gameDuration % 60}s`,
                    gameType: props.gameType, mapId: props.mapId, gameMode: "Ultimate Spellbook"
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
    console.log(kdaStyle)

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
                        <div className={styles.perks_container}>
                            <div className={styles.perk1_container}>
                                <Image src={`/../public/perk_icons/${matchInfo.participant.perks.styles[0].selections[0].perk}.png`} width={200} height={200} />
                            </div>
                            <div className={styles.perk2_container}>
                                <Image src={`/../public/perk_icons/${matchInfo.participant.perks.styles[1].style}.png`} width={200} height={200} />
                            </div>
                        </div>
                        <div className={styles.score_container}>
                            <div className={styles.kda_container}>
                                <h3 className={styles.killsandassists}>{matchInfo.participant.kills}</h3>
                                <h3 className={styles.divider}>/</h3>
                                <h3 className={styles.deaths}>{matchInfo.participant.deaths}</h3>
                                <h3 className={styles.divider}>/</h3>
                                <h3 className={styles.killsandassists}>{matchInfo.participant.assists}</h3>
                            </div>
                            <div className={styles.kda_calc_container}>
                                {(matchInfo.participant.kills + matchInfo.participant.assists) / matchInfo.participant.deaths === Infinity ? <p style={kdaStyle}>Perfect</p>
                                    : <p style={kdaStyle}>{(Math.round(((matchInfo.participant.kills + matchInfo.participant.assists) / matchInfo.participant.deaths) * 100) / 100)}</p>}
                                <p className={styles.kda_word}>KDA</p>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}