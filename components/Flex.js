import React from "react"
import styles from "../styles/Rank.module.css"
import Image from "next/image"

export default function Flex(props) {

    const [exists, setExists] = React.useState(false)

    React.useEffect(() => {
        if (props.exists === true) {
            setExists(true)
        }
    },[])

    return (
        <>
            {
                exists ? <div className={styles.container_ranked}>
                    <div className={styles.ranked_left_info}>
                        <div className={styles.title_container}>
                            <p>Ranked Flex</p>
                            <div className={styles.rank_icon}>
                                <Image src={`/../public/ranks/${props.tier}.png`} height={300} width={300} />
                            </div>
                        </div>
                        <div className={styles.rank_info}>
                            <h2>{props.tier.charAt(0) + props.tier.substring(1).toLowerCase() + " " + props.rank}</h2>
                            <p>{`${props.leaguePoints} LP`}</p>
                        </div>
                    </div>
                    <div className={styles.ranked_right_info}>
                        <p className={styles.wins_losses}>{props.wins}W {props.losses}L</p>
                        <p>{Math.round((props.wins)/(props.wins+props.losses)*100)}% Winrate</p>
                    </div>
                </div>
                    :
                    <div className={styles.container_unranked}>
                        <div className={styles.unranked_left_info}>
                            <p>Ranked Flex</p>
                        </div>
                        <div className={styles.unranked_right_info}>
                            <p>Unranked</p>
                        </div>
                    </div>
            }
        </>
    )
}