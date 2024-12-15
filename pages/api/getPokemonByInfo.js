import { getPokemonByInfo } from "@/util/pokemon"

export default async function handler(req, res) {
  const {id} =req.query

  if(!id) {
    return res.status(400).json({error: '포켓몬 id가 필요합니다.'})
  }

  try {
    const pokemonData = await getPokemonByInfo(id)
    res.status(200).json(pokemonData)
  } catch(err) {
    res.status(500).json({error: '포켓몬 정보를 가져오는데 실패 했습니다.'})
  }
}