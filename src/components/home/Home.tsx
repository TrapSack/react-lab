import SearchField from "@/elements/searchField";
import GamesContainer from "@/elements/gamesContainer/gamesContainer";
import { useDispatch } from "react-redux";
import { getTopProducts } from "@/redux/actions/gamesActions";
import Platforms from "./platformsContainer/platforms";
import home from "./home.module.scss";

export default function Home() {
  const dispatch = useDispatch();
  dispatch(getTopProducts());
  return (
    <div className={home.home}>
      <SearchField topProducts />
      <Platforms />
      <GamesContainer home />
    </div>
  );
}
