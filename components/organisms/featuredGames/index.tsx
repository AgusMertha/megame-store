import { useCallback, useEffect, useState } from "react";
import { GameItemTypes } from "../../../services/dataTypes";
import { getFeaturedGame } from "../../../services/player";
import HomeSectionTitle from "../../atoms/homeSectionTitle";
import FeaturedGamesItem from "../../molecules/featuredGamesItem";

export default function FeaturedGames() {
  // create states
  const [gameList, setGameList] = useState([])
  
  const getFeaturedGameList = useCallback( async () => {
    const data  = await getFeaturedGame()
    setGameList(data)
  }, [getFeaturedGame])

  useEffect( () => {
    getFeaturedGameList()
  }, [])

  const API_IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL
  return (
    <section className="featured-game pt-50 pb-50">
      <div className="container-fluid">
        <HomeSectionTitle desc1="Our Featured" desc2="Games This Year" classList="text-4xl fw-bold color-palette-1 mb-30"/>
        <div className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4" data-aos="fade-up">
          {gameList.map((game: GameItemTypes) => {
            return (<FeaturedGamesItem key={game._id} id={game._id} title={game.name} platform={game.category.name} thumbnail={`${API_IMAGE}/${game.thumbnail}`}/>)
          })}
        </div>
      </div>
    </section>
  )
}
