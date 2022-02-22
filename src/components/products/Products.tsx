// import GamesContainer from "@/elements/gamesContainer/gamesContainer";
// import GamesContainer from "@/elements/gamesContainer/gamesContainer";
import Loader from "@/elements/loader";
import SearchField from "@/elements/searchField";
import useLoader from "@/helpers/useLoader";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import React, { lazy } from "react";
import { useSelector } from "react-redux";
import "./products.scss";
import SortField from "./sortField";

const GamesContainer = lazy(() => import("@/elements/gamesContainer/gamesContainer"));

export default function Products() {
  const games = useSelector((state: RootReducerType) => state.games);
  const loaderState = useLoader(!!games.length);
  return (
    <div className="products">
      <SearchField />
      <div className="products__main">
        <SortField />
        {/* {loaderState ? <Loader /> : <GamesContainer />} */}
        <React.Suspense fallback={<Loader />}>
          <GamesContainer />
        </React.Suspense>
      </div>
    </div>
  );
}
