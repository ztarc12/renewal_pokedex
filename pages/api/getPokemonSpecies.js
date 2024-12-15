import { getPokemonSpecies } from "@/util/pokemon"

export default async function(req, res) {
  const {id} = req.query

  if(!id) {
    return res.status(400).json({error: '포켓몬 id가 필요합니다.'})
  }

  try{
    const speciesData = await getPokemonSpecies(id)
    res.status(200).json(speciesData)
  } catch (err) {
    res.status(500).json({error: '포켓몬 스펙을 가져오는데 실패 했습니다.'})
  }
}