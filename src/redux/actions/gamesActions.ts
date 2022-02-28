/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { nanoid } from "nanoid";
import { Dispatch } from "redux";
import { IActionTypes, IClearGames, IGame, IRemoveGame, IUpdateGame } from "../types/gamesTypes";

export function getTopProducts() {
  return async (dispatch: (arg0: { type: IActionTypes; payload: IGame[] }) => void) => {
    const data = await axios.get("api/GetTopProducts");
    const parsedData = await data.data;
    dispatch({
      type: IActionTypes.GET_TOP_PRODUCTS,
      payload: parsedData,
    });
  };
}

export function searchGame(name: string) {
  return async (dispatch: (arg0: { type: IActionTypes; payload: IGame[] }) => void) => {
    const data = await axios.get(`api/search/${name}`);
    const parsedData = await data.data;
    dispatch({
      type: IActionTypes.GET_TOP_PRODUCTS,
      payload: parsedData,
    });
  };
}

export function getGames(platform = "", genre = "", age = "", sortBy = "", orderBy = "") {
  return async (dispatch: (arg0: { type: IActionTypes; payload: unknown }) => void) => {
    const data = await axios.get("api/getGames", { params: { platform, genre, age, sortBy, orderBy } });
    const parsedData = data.data;
    dispatch({
      type: IActionTypes.GET_GAMES,
      payload: parsedData,
    });
  };
}

export function clearGames(): IClearGames {
  return {
    type: IActionTypes.CLEAR_GAMES,
  };
}

export function addGame(
  name: string,
  price: number,
  age: number,
  genre: string,
  platforms: Array<string>,
  cover: string,
  description: string
) {
  return async (dispatch: Dispatch) => {
    const data = await axios.post("/api/product", {
      item: {
        id: nanoid(),
        name,
        price,
        rating: 0,
        age,
        genre,
        releaseDate: "2016-05-02",
        platforms,
        cover,
        description,
      },
    });
    const parsedData = await data.data;
    console.log(parsedData);
    dispatch({
      type: IActionTypes.ADD_GAME,
      payload: parsedData,
    });
  };
}

export function removeGame(id: string): IRemoveGame {
  axios.delete("/api/product", {
    params: {
      id,
    },
  });
  return {
    type: IActionTypes.REMOVE_GAME,
    payload: {
      id,
    },
  };
}

export function updateGame(
  id: string,
  name: string,
  price: number,
  rating: number,
  age: number,
  genre: string,
  releaseDate: string,
  platforms: Array<string>,
  cover: string,
  description: string
): IUpdateGame {
  axios.put("/api/product", {
    item: {
      id,
      name,
      price,
      rating,
      age,
      genre,
      releaseDate,
      platforms,
      cover,
      description,
    },
  });
  return {
    type: IActionTypes.UPDATE_GAME,
    payload: {
      id,
      name,
      price,
      rating,
      age,
      genre,
      releaseDate,
      platforms,
      cover,
      description,
    },
  };
}
