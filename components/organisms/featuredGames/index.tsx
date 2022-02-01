import HomeSectionTitle from "../../atoms/homeSectionTitle";
import FeaturedGamesItem from "../../molecules/featuredGamesItem";

export default function FeaturedGames() {
  return (
    <section className="featured-game pt-50 pb-50">
      <div className="container-fluid">
        <HomeSectionTitle desc1="Our Featured" desc2="Games This Year" classList="text-4xl fw-bold color-palette-1 mb-30"/>
        <div className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4" data-aos="fade-up">
          <FeaturedGamesItem title="Super Mechs" platform="mobile" image="/img/Thumbnail-1.png"/>
          <FeaturedGamesItem title="Call of Duty: Modern" platform="mobile" image="/img/Thumbnail-2.png"/>
          <FeaturedGamesItem title="Mobile Legends" platform="mobile" image="/img/Thumbnail-3.png"/>
          <FeaturedGamesItem title="Clash of Clans" platform="mobile" image="/img/Thumbnail-4.png"/>
          <FeaturedGamesItem title="Valorant" platform="desktop" image="/img/Thumbnail-5.png"/>
        </div>
      </div>
    </section>
  )
}
