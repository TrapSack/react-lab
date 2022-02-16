import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { ChangeEvent, useEffect, useState } from "react";
import { getTopProducts, searchGame } from "@/redux/actions/gamesActions";
import Loader from "../../elements/loader";
import debounce from "../../helpers/useDebounce";
import Platforms from "./platformsContainer/platforms";
import GamesContainer from "./gamesContainer/gamesContainer";

export default function Home() {
  const [searchState, setSearchState] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const gamesArr = useSelector((state: RootReducerType) => state.games.games);
  const dispatch = useDispatch();

  function doSearchToApi() {
<<<<<<< HEAD
    if (!searchState) {
=======
    if (searchState === "") {
>>>>>>> c2cbf7439ed2e027d5ee8a92f894b363dfffb548
      dispatch(getTopProducts());
      setShowLoader(false);
    } else {
      dispatch(searchGame(searchState));
      setShowLoader(false);
    }
  }
<<<<<<< HEAD

=======
  useEffect(() => {
    dispatch(getTopProducts());
  }, []);
  const debouncedSearch = debounce(doSearchToApi, 300);
  useEffect(() => {
    debouncedSearch();
  }, [searchState]);
>>>>>>> c2cbf7439ed2e027d5ee8a92f894b363dfffb548
  function toggleChange(e: ChangeEvent<HTMLInputElement>) {
    setShowLoader(true);
    setSearchState(e.target.value);
  }

  const debouncedSearch = debounce(doSearchToApi, 300);

  useEffect(() => {
    dispatch(getTopProducts());
  }, []);
  useEffect(() => {
    debouncedSearch();
  }, [searchState]);

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
      {showLoader && <Loader />}
      <Platforms />
      {!showLoader && <GamesContainer gamesArr={gamesArr} />}
    </div>
  );
}
