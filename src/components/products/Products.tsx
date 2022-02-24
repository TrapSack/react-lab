// import GamesContainer from "@/elements/gamesContainer/gamesContainer";
// import useLoader from "@/helpers/useLoader";
// import { RootReducerType } from "@/redux/reducers/rootReducer";
// import { useSelector } from "react-redux";
import SearchField from "@/elements/searchField";
// import GamesContainer from "@/elements/gamesContainer/gamesContainer";
// import Loader from "@/elements/loader";
// import { lazy } from "react";
import "./products.scss";
import React, { lazy } from "react";
import Loader from "@/elements/loader";

const GamesContainer = lazy(() => import("@/elements/gamesContainer/gamesContainer"));
const SortField = lazy(() => import("./sortField"));

export default function Products() {
  // const games = useSelector((state: RootReducerType) => state.games);
  // const loaderState = useLoader(!!games.length);
  return (
    <div className="products">
      <SearchField />
      <div className="products__main">
        <React.Suspense fallback={<Loader />}>
          <SortField />
          {/* {loaderState ? <Loader /> : <GamesContainer />} */}
          <GamesContainer />
        </React.Suspense>
      </div>
    </div>
  );
}
