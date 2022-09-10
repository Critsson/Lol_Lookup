import React from "react"
import styles from "../styles/Match.module.css"
import Image from "next/image"
import Link from "next/link"

export default function Match(props) {

    const [matchInfo, setMatchInfo] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    let won;
    let participant;
    let kdaStyle;
    let csStyle;
    const firstTeam = [];
    const secondTeam = [];

    for (let i = 0; i < props.participants.length; i++) {
        if (props.participants[i].puuid === props.puuid) {
            won = props.participants[i].win
            participant = props.participants[i]
        }
    }

    for (let i = 0; i < 5; i++) {
        if (props.participants[i].puuid === props.puuid) {
            firstTeam.push(
                <div className={styles.participant_container}>
                    <div className={styles.participant_icon_container}>
                        <img alt="Champion" src={`/champion_icons/${props.participants[i].championName}.png`} />
                    </div>
                    <p className={styles.selected_summoner_name}>{props.participants[i].summonerName}</p>
                </div>
            )
            continue;
        }
        firstTeam.push(
            <div className={styles.participant_container}>
                <div className={styles.participant_icon_container}>
                    <img alt="Champion" src={`/champion_icons/${props.participants[i].championName}.png`} />
                </div>
                <Link href={`/summoner/${props.region.toLowerCase()}/${props.participants[i].summonerName}`}>
                    <p className={styles.non_selected_summoner_name}>{props.participants[i].summonerName}</p>
                </Link>
            </div>
        )
    }

    for (let i = 5; i < props.participants.length; i++) {
        if (props.participants[i].puuid === props.puuid) {
            secondTeam.push(
                <div className={styles.participant_container}>
                    <div className={styles.participant_icon_container}>
                        <img alt="Champion" src={`/champion_icons/${props.participants[i].championName}.png`} />
                    </div>
                    <p className={styles.selected_summoner_name}>{props.participants[i].summonerName}</p>
                </div>
            )
            continue;
        }
        secondTeam.push(
            <div className={styles.participant_container}>
                <div className={styles.participant_icon_container}>
                    <img alt="Champion" src={`/champion_icons/${props.participants[i].championName}.png`} />
                </div>
                <Link href={`/summoner/${props.region.toLowerCase()}/${props.participants[i].summonerName}`}>
                    <p className={styles.non_selected_summoner_name}>{props.participants[i].summonerName}</p>
                </Link>
            </div>
        )
    }

    if ((Math.round(((participant.kills + participant.assists) / participant.deaths) * 100) / 100) >= 5) {
        kdaStyle = { color: "#FF9B1E", fontWeight: 700, fontSize: ".7vw" }
    } else if ((Math.round(((participant.kills + participant.assists) / participant.deaths) * 100) / 100) >= 3) {
        kdaStyle = { color: "#18BD9B", fontWeight: 700, fontSize: ".7vw" }
    } else if ((Math.round(((participant.kills + participant.assists) / participant.deaths) * 100) / 100) >= 2) {
        kdaStyle = { color: "white", fontWeight: 700, fontSize: ".7vw" }
    } else if ((Math.round(((participant.kills + participant.assists) / participant.deaths) * 100) / 100) > 0) {
        kdaStyle = { color: "#E84057", fontWeight: 700, fontSize: ".7vw" }
    }

    if ((Math.round(((participant.totalMinionsKilled + participant.neutralMinionsKilled) / (props.gameDuration / 60)) * 10) / 10) >= 9) {
        csStyle = { color: "#FF9B1E", fontWeight: 700, fontSize: ".7vw" }
    } else if ((Math.round(((participant.totalMinionsKilled + participant.neutralMinionsKilled) / (props.gameDuration / 60)) * 10) / 10) >= 7) {
        csStyle = { color: "#18BD9B", fontWeight: 700, fontSize: ".7vw" }
    } else if ((Math.round(((participant.totalMinionsKilled + participant.neutralMinionsKilled) / (props.gameDuration / 60)) * 10) / 10) >= 5 || participant.role === "SUPPORT" || props.queueId === 450) {
        csStyle = { color: "white", fontWeight: 700, fontSize: ".7vw" }
    } else if ((Math.round(((participant.totalMinionsKilled + participant.neutralMinionsKilled) / (props.gameDuration / 60)) * 10) / 10) >= 0) {
        csStyle = { color: "#E84057", fontWeight: 700, fontSize: ".7vw" }
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
                            <img alt="Champion" className={styles.champion_icon} src={`/champion_icons/${matchInfo.participant.championName}.png`} />
                        </div> :
                            <div className={styles.champion_icon_container_defeat}>
                                <img alt="Champion" className={styles.champion_icon} src={`/champion_icons/${matchInfo.participant.championName}.png`} />
                            </div>}
                        <div className={styles.summs_container}>
                            <div className={styles.summ_container}>
                                <Image alt="Summoner Spell" src={`/summoner_spells/${matchInfo.participant.summoner1Id}.png`} width={200} height={200} />
                            </div>
                            <div className={styles.summ_container}>
                                <Image alt="Summoner Spell" src={`/summoner_spells/${matchInfo.participant.summoner2Id}.png`} width={200} height={200} />
                            </div>
                        </div>
                        <div className={styles.perks_container}>
                            <div className={styles.perk1_container}>
                                <Image alt="Perk" src={`/perk_icons/${matchInfo.participant.perks.styles[0].selections[0].perk}.png`} width={200} height={200} />
                            </div>
                            <div className={styles.perk2_container}>
                                <Image alt="Perk" src={`/perk_icons/${matchInfo.participant.perks.styles[1].style}.png`} width={200} height={200} />
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
                                {(matchInfo.participant.kills + matchInfo.participant.assists) / matchInfo.participant.deaths === Infinity ? <p className={styles.perfect} style={kdaStyle}>Perfect</p>
                                    : <p style={kdaStyle}>{(Math.round(((matchInfo.participant.kills + matchInfo.participant.assists) / matchInfo.participant.deaths) * 100) / 100)}</p>}
                                <p className={styles.kda_word}>KDA</p>
                            </div>
                            <div className={styles.cs_container}>
                                <p className={styles.cs}>{matchInfo.participant.totalMinionsKilled + matchInfo.participant.neutralMinionsKilled} CS</p>
                                <p className={styles.cs_bracket}>&#40;</p>
                                <p style={csStyle}>{Math.round(((participant.totalMinionsKilled + participant.neutralMinionsKilled) / (props.gameDuration / 60)) * 10) / 10}</p>
                                <p className={styles.cs_bracket}>&#41;</p>
                            </div>
                            {matchInfo.participant.visionScore > 0 && <p className={styles.vision_score}>{matchInfo.participant.visionScore} Vision</p>}
                        </div>
                        <div className={styles.outer_items_container}>
                            <div className={styles.items_container}>
                                <div className={styles.smaller_items_container}>
                                    <div className={styles.item_container}>
                                        {matchInfo.participant.item0 !== 0 && <Image alt="Item" src={`/items/${matchInfo.participant.item0}.png`} width={200} height={200} />}
                                    </div>
                                    <div className={styles.item_container}>
                                        {matchInfo.participant.item1 !== 0 && <Image alt="Item" src={`/items/${matchInfo.participant.item1}.png`} width={200} height={200} />}
                                    </div>
                                    <div className={styles.item_container}>
                                        {matchInfo.participant.item2 !== 0 && <Image alt="Item" src={`/items/${matchInfo.participant.item2}.png`} width={200} height={200} />}
                                    </div>
                                </div>
                                <div className={styles.smaller_items_container}>
                                    <div className={styles.item_container}>
                                        {matchInfo.participant.item3 !== 0 && <Image alt="Item" src={`/items/${matchInfo.participant.item3}.png`} width={200} height={200} />}
                                    </div>
                                    <div className={styles.item_container}>
                                        {matchInfo.participant.item4 !== 0 && <Image alt="Item" src={`/items/${matchInfo.participant.item4}.png`} width={200} height={200} />}
                                    </div>
                                    <div className={styles.item_container}>
                                        {matchInfo.participant.item5 !== 0 && <Image alt="Item" src={`/items/${matchInfo.participant.item5}.png`} width={200} height={200} />}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.trinket_container}>
                                {matchInfo.participant.item6 !== 0 && <Image alt="Item" src={`/items/${matchInfo.participant.item6}.png`} width={200} height={200} />}
                            </div>
                        </div>
                    </div>
                    <div className={styles.participants_container}>
                        <div className={styles.team_container}>
                            {firstTeam}
                        </div>
                        <div className={styles.team_container}>
                            {secondTeam}
                        </div>
                    </div>
                </div>}
        </>
    )
}