import { fetchAllPokemon } from "@/util/pokemon"

export default async function(req, res) {
  const {startId, endId} = req.query

  if(!startId || !endId) {
    return res.status(400).json({error: '포켓몬의 startId와 endId가 필요합니다'})
  }

  try {
    const pokemonList = await fetchAllPokemon(parseInt(startId), parseInt(endId))
    res.status(200).json(pokemonList)
  } catch (err) {
    res.status(500).json({error: '포켓몬 목록을 가져오는데 실패 했습니다.'})
  }
}