import SearchField from "@/elements/searchField";
import GamesContainer from "@/elements/gamesContainer/gamesContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { useEffect } from "react";
import { getTopProducts } from "@/redux/actions/gamesActions";
import Platforms from "./platformsContainer/platforms";
import home from "./home.module.scss";

export default function Home() {
  const dispatch = useDispatch();
  const games = useSelector((state: RootReducerType) => state.games);
  useEffect(() => {
    if (games.length !== 3) dispatch(getTopProducts());
  }, []);
  return (
    <div className={home.home}>
      <SearchField topProducts />
      <Platforms />
      <GamesContainer home />
    </div>
  );
}
