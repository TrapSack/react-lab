import React, { lazy } from "react";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { useSelector } from "react-redux";
// import NoMatchesParagraph from "../noMatchesParagraph";
// import GameCard from "./gameCard";
import Loader from "../loader";

const GameCard = lazy(() => import("@/elements/gamesContainer/gameCard"));

export default function GamesContainer(): JSX.Element {
  const games = useSelector((state:RootReducerType)=> state.games)
  const gameComponentArray = games.map((game) => (
    <GameCard
      key={game.id}
      id={game.id}
      name={game.name}
      genre={game.genre}
      rating={game.rating}
      price={game.price}
      cover={game.cover}
      description={game.description}
      platforms={game.platforms}
      releaseDate={game.releaseDate}
      age={game.age}
    />
  ));
  return (
    <React.Suspense fallback={<Loader />}>
      <div className="games-container">{gameComponentArray}</div>
    </React.Suspense>
  );
}
