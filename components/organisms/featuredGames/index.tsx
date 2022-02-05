import axios from "axios";
import { useEffect, useState } from "react";
import HomeSectionTitle from "../../atoms/homeSectionTitle";
import FeaturedGamesItem from "../../molecules/featuredGamesItem";

export default function FeaturedGames() {
  // create states
  const [gameList, setGameList] = useState([])
  useEffect( async () => {
    const response = await axios.get('https://megame-shop.herokuapp.com/api/v1/players/landing-page')

    setGameList(response.data.data)
  }, [])
  return (
    <section className="featured-game pt-50 pb-50">
      <div className="container-fluid">
        <HomeSectionTitle desc1="Our Featured" desc2="Games This Year" classList="text-4xl fw-bold color-palette-1 mb-30"/>
        <div className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4" data-aos="fade-up">
          {gameList.map(game => {
            return (<FeaturedGamesItem key={game._id} title={game.name} platform={game.category.name} thumbnail={`https://megame-shop.herokuapp.com/uploads/${game.thumbnail}`}/>)
          })}
        </div>
      </div>
    </section>
  )
}
