import "./home.scss";
import SearchField from "@/elements/searchField";
import GamesContainer from "@/elements/gamesContainer/gamesContainer";
import { useDispatch } from "react-redux";
import { getTopProducts } from "@/redux/actions/gamesActions";
import Platforms from "./platformsContainer/platforms";

export default function Home() {
  const dispatch = useDispatch();
  dispatch(getTopProducts());
  return (
    <div className="home">
      <SearchField topProducts />
      <Platforms />
      <GamesContainer home={true} />
    </div>
  );
}
