import axios from "axios";
import React, { lazy, useEffect, useState } from "react";
// import { RootReducerType } from "@/redux/reducers/rootReducer";
// import { useSelector } from "react-redux";
// import NoMatchesParagraph from "../noMatchesParagraph";
import GameCard from "./gameCard";
import Loader from "../loader";
// import { IGame } from "@/redux/types/gamesTypes";

async function getGames() {
  const res = await axios.get("/api/getGames/", {
    params: {
      platform: "desktop",
      genre: "",
      age: "",
      sortBy: "name",
      orderBy: "ASC",
    },
  });
  return res.data;
}

function wrap(res) {
  console.log(res);
  let status = "pending";
  let result;
  const suspender = res.then(
    (r) => {
      result = r;
      status = "success";
    },
    (e) => {
      result = e;
      status = "error";
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

function useResource() {
  return {
    games: wrap(getGames()),
  };
}

const resource = useResource();
const GameCard = lazy(() => import("@/elements/gamesContainer/gameCard"));

export default function GamesContainer(): JSX.Element {
  // const [gameComponentArray, setGameComponentArray] = useState([]);
  // const gameComponentArray = useSelector((state: RootReducerType) => state.games).map((game) => (
  //   <GameCard
  //     key={game.id}
  //     id={game.id}
  //     name={game.name}
  //     rating={game.rating}
  //     price={game.price}
  //     cover={game.cover}
  //     description={game.description}
  //     platforms={game.platforms}
  //     releaseDate={game.releaseDate}
  //     age={game.age}
  //   />
  // ));
  // console.log(resource);
  const gameComponentArray = resource.games
    .read()
    .map((game: IGame) => (
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
  console.log(gameComponentArray);
  // const parsedData = await data.data;
  // console.log(gameComponentArray);
  return <div className="games-container">{gameComponentArray.length ? gameComponentArray : null}</div>;
}
