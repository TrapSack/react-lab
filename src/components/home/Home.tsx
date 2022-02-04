import "./home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { IGame } from "./gamesContainer/interfaces";
// import GamesContainer from "./gamesContainer/gamesContainer";

export default function Home() {
  const [gamesArr, setGamesArr] = useState<IGame[]>();
  useEffect(() => {
    axios.get("/api/search/").then((res) => {
      setGamesArr(res.data);
    });
  }, []);
  return (
    <div className="home">
      <input type="text" name="search-game" className="home__game-search" placeholder="Search..." />
      {/* <GamesContainer gamesArr={gamesArr} /> */}
    </div>
  );
}
