// import GamesContainer from "@/elements/gamesContainer/gamesContainer";
import SearchField from "@/elements/searchField";
import axios from "axios";
import React, { lazy } from "react";
import "./products.scss";
import SortField from "./sortField";

const GamesContainer = lazy(() => import("@/elements/gamesContainer/gamesContainer"));

export default function Products() {
  axios.get("api/getGames/", { params: { platform: "playstation", orderBy: "DESC", sortBy: "name" } }).then((res) => {
    console.log(res);
  });
  return (
    <div className="products">
      <SearchField />
      <div className="products__main">
        <SortField />
        <React.Suspense fallback={<h2>Loading...</h2>}>
          <GamesContainer />
        </React.Suspense>
      </div>
    </div>
  );
}
