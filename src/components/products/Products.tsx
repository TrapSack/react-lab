import SearchField from "@/elements/searchField";
import React, { lazy } from "react";
import "./products.scss";
import Loader from "@/elements/loader";
import useLoader from "@/helpers/useLoader";
import { useSelector } from "react-redux";
// import SortField from "./sortField";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import GamesContainer from "@/elements/gamesContainer/gamesContainer";

// const GamesContainer = lazy(() => import("@/elements/gamesContainer/gamesContainer"));
const SortField = lazy(() => import("./sortField"));

export default function Products() {
  const games = useSelector((state: RootReducerType) => state.games);
  const loaderState = useLoader(!!games.length);
  return (
    <div className="products">
      <SearchField />
      <div className="products__main">
        <React.Suspense fallback={<Loader />}>
          <SortField />
          {loaderState ? <Loader /> : <GamesContainer />}
          {/* <GamesContainer /> */}
        </React.Suspense>
      </div>
    </div>
  );
}
