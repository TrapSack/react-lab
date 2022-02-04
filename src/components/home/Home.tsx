import "./home.scss";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import debounce from "../../helpers/useDebounce";
import { IGame } from "./gamesContainer/interfaces";
import GamesContainer from "./gamesContainer/gamesContainer";
import Platforms from "./platformsContainer/platforms";

export default function Home() {
  const [gamesArr, setGamesArr] = useState<IGame[]>([]);
  const [searchState, setSearchState] = useState<string>("");
  function doSearchToApi() {
    console.log(searchState);
    axios.get(`/api/search/${searchState}`).then((res) => {
      setGamesArr(res.data);
    });
  }
  const debouncedSearch = debounce(doSearchToApi, 300);
  useEffect(() => {
    debouncedSearch();
  }, [searchState]);
  useEffect(() => {
    axios.get("/api/search/").then((res) => {
      setGamesArr(res.data);
    });
  }, []);
  function toggleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchState(e.target.value);
  }
  return (
    <div className="home">
      <input
        type="text"
        name="search-game"
        className="home__game-search"
        placeholder="Search..."
        onChange={toggleChange}
        value={searchState}
      />
      <Platforms />
      <GamesContainer gamesArr={gamesArr} />
    </div>
  );
}
