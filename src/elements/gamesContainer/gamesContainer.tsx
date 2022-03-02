import { RootReducerType } from "@/redux/reducers/rootReducer";
import React, { lazy } from "react";
import { useSelector } from "react-redux";
import Loader from "../loader";

const GameCard = lazy(() => import("./gameCard"));

export default function GamesContainer(): JSX.Element {
  // const [gameComponentArray, setGameComponentArray] = useState([]);
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
  // return <div className="games-container">{gameComponentArray.length ? gameComponentArray : null}</div>;
  return (
    <div className="games-container">
      <React.Suspense fallback={<Loader />}>{gameComponentArray}</React.Suspense>
    </div>
  );
}
