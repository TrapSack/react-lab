import { RootReducerType } from "@/redux/reducers/rootReducer";
import React, { lazy, useMemo } from "react";
import { useSelector } from "react-redux";
import Loader from "../loader";
import elementStyles from "../elementStyles.module.scss";

const GameCard = lazy(() => import("./gameCard"));

export default function GamesContainer(props: { home: boolean }): JSX.Element {
  const games = useSelector((state: RootReducerType) => state.games);
  const gameContainerClass = `${elementStyles["games-container"]}${props.home ? "--home" : ""}`;
  const gameComponentArray = useMemo(
    () =>
      games.map((game) => (
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
      )),
    [games]
  );
  return (
    <React.Suspense fallback={<Loader />}>
      <div className={gameContainerClass}>{gameComponentArray}</div>
    </React.Suspense>
  );
}
