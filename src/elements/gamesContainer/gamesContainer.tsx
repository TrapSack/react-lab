import useLoader from "@/helpers/useLoader";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { useSelector } from "react-redux";
import NoMatchesParagraph from "../noMatchesParagraph";
import GameCard from "./gameCard";

export default function GamesContainer(): JSX.Element {
  const gameComponentArray = useSelector((state: RootReducerType) => state.games).map((game) => (
    <GameCard
      key={game.id}
      id={game.id}
      name={game.name}
      rating={game.rating}
      price={game.price}
      cover={game.cover}
      description={game.description}
      platforms={game.platforms}
      releaseDate={game.releaseDate}
      age={game.age}
    />
  ));
  const Loader = useLoader(!!gameComponentArray.length);
  return (
    <div className="games-container">
      {Loader ? <h2>Loading...</h2> : gameComponentArray.length ? gameComponentArray : <NoMatchesParagraph />}
    </div>
  );
}
