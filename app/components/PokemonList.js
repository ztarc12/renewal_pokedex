'use client'

import Loading from "@/Loading"
import { typeColorMap, typeNameMap } from "@/util/pokemonType"
import axios from "axios"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

export default function PokemonData(){
  const [pokemons, setPokemons] = useState([])
  const [visiblePokemon, setVisiblePokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasMore,setHasMore] = useState(true)
  const startId = 1
  const [endId, setEndId] = useState(151)
  const pokemonPerPage = 40

  useEffect(()=>{
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(`/api/fetchAllPokemon?startId=${startId}&endId=${endId}`)
        const data = await response.data
        console.log(data)
        setPokemons((prev) => [...prev, ...data])
        // setPokemons(data)
        if(visiblePokemon.length === 0) {
          setVisiblePokemon(data.slice(0, pokemonPerPage));
        }
        setLoading(false)
        // setMoreData(false)
      } catch (err) {
        console.error('포켓몬 데이터를 가져오는 중 오류', err)
        setLoading(false)
        // setMoreData(false)
      }
    }
    fetchPokemons()
  },[endId])

  const fetchMoreData = () => {
    if (visiblePokemon.length >= pokemons.length) {
      if(endId >= 1008) {
        setHasMore(false);
        return; 
      }
      // setMoreData(true)
      setEndId((prevEndId) => prevEndId + 50)
    }
    const nextPokemons = pokemons.slice(
      visiblePokemon.length,
      visiblePokemon.length + pokemonPerPage
    );
    setVisiblePokemon((prev) => [...prev, ...nextPokemons]);
  };
  return(
    <div>
      {
        loading ? (<Loading/>) :
        (
          <InfiniteScroll
            dataLength={visiblePokemon.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loading/>}
            >
            <h1 className="main-logo"><img src={'/pokemon_logo.png'}/></h1>
            <ul className="pokemon-box">
              {
                visiblePokemon.map((pokemon)=>{
                  return(
                    <li key={pokemon.id}>
                      <div className='pokemonInfoBox'>
                          <img className='pokemonImg' src={pokemon.sprites.front_default} alt={pokemon.name} />
                          <div className='pokemonName'>
                            <p className='pokemonNo'>NO.{pokemon.id}</p>
                            <h3 className='pokemonTitle'>{pokemon.korean_name}</h3>
                          </div>
                        </div>
                        <div className="pokemonTypeBox"> 
                          {
                            pokemon.types.map((type, i)=>{
                              return(
                                <span className='pokemonType' style={{backgroundColor: typeColorMap[type.type.name]}}>{typeNameMap[type.type.name]}</span>
                              )
                            })
                          }
                        </div>
                    </li>
                  )
                })
              }
            </ul>
          </InfiniteScroll>
        )
      }
    </div>
  )
}
