// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import fs from "fs";
import games from "./src/api/games.json";
import users from "./src/api/users.json";

interface IUser {
  login: string;
  password: string;
}

interface IGame {
  id: string;
  name: string;
  rating: number;
  price: number;
  releaseDate: string;
  cover: string;
  description: string;
}

export default webpackMockServer.add((app, helper) => {
  app.get("/testMock", (_req, res) => {
    const response = {
      id: helper.getUniqueIdInt(),
      randomInt: helper.getRandomInt(),
      lastDate: new Date(),
    };

    res.json(response);
  });
  app.get(`/api/search/*`, (_req, res) => {
    const resultArr: IGame[] = [];
    games.forEach((game: IGame) => {
      if (game.name.toLowerCase().includes(_req.path.split("/")[3].toLowerCase())) {
        resultArr.push(game);
      }
      return game;
    });
    res.json(resultArr);
  });
  app.get(`/api/getTopProducts`, (_req, res) => {
    const resultArr: IGame[] = [...games];
    resultArr.sort((game1: IGame, game2: IGame): number => {
      if (new Date(game1.releaseDate) > new Date(game2.releaseDate)) return -1;
      if (new Date(game1.releaseDate) < new Date(game2.releaseDate)) return 1;
      if (new Date(game1.releaseDate) === new Date(game2.releaseDate)) return 0;
      return 0;
    });
    res.json(resultArr.slice(0, 3));
  });
  app.get(`/api/getUser/*`, (_req, res) => {
    const userName = _req.path.split("/")[3];
    if (userName === "") {
      res.json(undefined);
    } else {
      res.json(users.find((user) => user.login.toLowerCase() === userName.toLowerCase())?.login);
    }
  });
  app.get(`/api/authorizeUser/*/*`, (_req, res) => {
    const [userName, userPass] = _req.path.split("/").slice(3, 5);
    let confirmAuthorization = false;
    users.forEach((user) => {
      if (user.login.toLowerCase() === userName.toLowerCase()) {
        if (user.password === userPass) {
          confirmAuthorization = true;
        }
      }
    });
    res.json(confirmAuthorization);
  });
  app.post("/api/postUser/*/*", (req, res) => {
    const [userName, userPass] = req.path.split("/").slice(3, 5);
    users.push({ login: userName, password: userPass });
    fs.writeFileSync("./src/api/users.json", JSON.stringify(users));
    res.json(true);
  });
});
