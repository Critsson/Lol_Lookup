import React from "react"
import Head from "next/head"

export default function SummonerPage({ summonerData, rankData, matchesData, matchDataArray }) {

    console.log(matchDataArray)

    return (
        <>
        <Head>
            <title>{`${summonerData.name} - Summoner Stats`}</title>
        </Head>
        </>
    )

}

export async function getServerSideProps({params, res}) {

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=604800"
    )

    const { summonerName } = params
    const fixedSummonerName = summonerName.replaceAll(" ", "%20")
    const summonerResponse = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${fixedSummonerName}?api_key=${process.env.RIOT_API}`)
    const summonerData = await summonerResponse.json()
    const matchesResponse = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerData.puuid}/ids?start=0&count=20&api_key=${process.env.RIOT_API}`)
    const matchesData = await matchesResponse.json()
    const rankResponse = await fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}?api_key=${process.env.RIOT_API}`)
    const rankData = await rankResponse.json()
    const matchDataArray = matchesData.map(async(match) => {
        const response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${process.env.RIOT_API}`)
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