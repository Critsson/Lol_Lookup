export default async function handler(req, res) {

    try {
        const { matchId } = req.query
        const response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.RIOT_API}`)
        const data = await response.json()
        res.status(200).json(data)
    } catch (err) {
        console.error(err)
    }
}