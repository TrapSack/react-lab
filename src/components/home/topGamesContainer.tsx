import Loader from "@/elements/loader";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import React, { lazy, useMemo } from "react";
import { useSelector } from "react-redux";
import home from "./home.module.scss";

const GameCard = lazy(() => import("../../elements/gamesContainer/gameCard"));

export default function TopGamesContainer() {
  const topProducts = useSelector((state: RootReducerType) => state.topProducts);
  const gameComponentArray = useMemo(
    () =>
      topProducts.map((game) => (
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
    [topProducts]
  );
  return (
    <div className={home["home__top-products-container"]}>
      <React.Suspense fallback={<Loader />}>{gameComponentArray}</React.Suspense>
    </div>
  );
}
