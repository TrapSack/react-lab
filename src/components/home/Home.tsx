import { useState } from "react";
import SearchField from "../../elements/searchField";
import GamesContainer from "../../elements/gamesContainer/gamesContainer";
import Platforms from "./platformsContainer/platforms";
import home from "./home.module.scss";
import TopGamesContainer from "./topGamesContainer";

export default function Home() {
  const [showTopProducts, setShowTopProducts] = useState(true);
  return (
    <div className={home.home}>
      <SearchField topProducts setShowTopProducts={setShowTopProducts} />
      <Platforms />
      {showTopProducts ? <TopGamesContainer /> : <GamesContainer home />}
    </div>
  );
}
