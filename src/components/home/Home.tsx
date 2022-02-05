import "./home.scss";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "../../elements/loader";
import debounce from "../../helpers/useDebounce";
import { IGame } from "./gamesContainer/interfaces";
import GamesContainer from "./gamesContainer/gamesContainer";
import Platforms from "./platformsContainer/platforms";

export default function Home() {
  const [searchState, setSearchState] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [gamesArr, setGamesArr] = useState<IGame[]>([]);
  function doSearchToApi() {
    console.log(searchState);
    axios.get(`/api/search/${searchState}`).then((res) => {
      setGamesArr(res.data);
      setShowLoader(false);
    });
  }
  const debouncedSearch = debounce(doSearchToApi, 300);
  useEffect(() => {
    debouncedSearch();
  }, [searchState]);
  // console.log("gamesArr :>> ", gamesArr);
  function toggleChange(e: ChangeEvent<HTMLInputElement>) {
    setShowLoader(true);
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
      {showLoader ? <Loader /> : <GamesContainer gamesArr={gamesArr} />}
    </div>
  );
}
