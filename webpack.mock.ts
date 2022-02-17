// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import fs from "fs";
import games from "./src/api/games.json";
import users from "./src/api/users.json";

interface IGame {
  id: string;
  name: string;
  rating: number;
  price: number;
  releaseDate: string;
  cover: string;
  description: string;
}

export default webpackMockServer.add((app) => {
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
    res.json(userName ? !!users.find((user) => user.login.toLowerCase() === userName.toLowerCase())?.login : undefined);
  });
  app.post(`/api/authorizeUser/`, (_req, res) => {
    const { userName, userPass } = _req.body;
    let responseUser;
    users.forEach((user) => {
      if (user.login.toLowerCase() === userName.toLowerCase()) {
        if (user.password === userPass) {
          responseUser = {
            login: user.login,
            description: user.description,
          };
        }
      }
      return user;
    });
    return res.status(responseUser ? 200 : 403).json(responseUser || false);
  });

  app.post("/api/postUser/", (req, res) => {
    const { userName, userPass } = req.body;
    const newUser = { login: userName, password: userPass, description: "" };
    users.push(newUser);
    fs.writeFileSync("./src/api/users.json", JSON.stringify(users));
    res.status(201).json({ login: newUser.login, description: newUser.description });
  });

  app.post("/api/saveUser/", (req, res) => {
    const { userNamePrev, userNameNew, userDescription } = req.body;
    const resultUsers = users.map((user) => {
      if (user.login === userNamePrev) {
        return {
          ...user,
          login: userNameNew,
          description: userDescription,
        };
      }
      return user;
    });
    fs.writeFileSync("./src/api/users.json", JSON.stringify(resultUsers));
    res.status(200).json(true);
  });

  app.post("/api/changePassword/", (req, res) => {
    const { userName, newPassword } = req.body;
    const resultUsers = users.map((user) => {
      if (user.login === userName) {
        return {
          ...user,
          password: newPassword,
        };
      }
      return user;
    });
    fs.writeFileSync("./src/api/users.json", JSON.stringify(resultUsers));
    res.status(200).json(true);
  });
});
