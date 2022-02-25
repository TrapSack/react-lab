// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import { ICartItem } from "@/redux/types/cartItemsTypes";
import fs from "fs";
// eslint-disable-next-line import/no-extraneous-dependencies
import express from "express";
import games from "./src/api/games.json";
import users from "./src/api/users.json";

interface IGame {
  id: string;
  name: string;
  price: number;
  rating: number;
  age: number;
  genre: string;
  releaseDate: string;
  cover: string;
  platforms: Array<string>;
  description: string;
}

export default webpackMockServer.add((app) => {
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.get(`/api/search/*`, (_req, res) => {
    const resultArr: IGame[] = [];
    games.forEach((game: IGame) => {
      if (game.name.toLowerCase().includes(_req.path.split("/")[3].toLowerCase())) {
        resultArr.push(game);
      }
      return game;
    });
    setTimeout(() => {
      res.json(resultArr);
    }, 1000);
  });

  app.get(`/api/getTopProducts`, (_req, res) => {
    const resultArr: IGame[] = [...games];
    resultArr.sort((game1: IGame, game2: IGame): number => {
      if (new Date(game1.releaseDate) > new Date(game2.releaseDate)) return -1;
      if (new Date(game1.releaseDate) < new Date(game2.releaseDate)) return 1;
      if (new Date(game1.releaseDate) === new Date(game2.releaseDate)) return 0;
      return 0;
    });
    // setTimeout(() => {
    res.json(resultArr.slice(0, 3));
    // }, 1000);
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
            phone: user.phone,
            adress: user.adress,
            photo: user.photo,
            cartItems: user.cartItems,
          };
        }
      }
      return user;
    });
    return res.status(responseUser ? 200 : 403).json(responseUser || false);
  });

  app.post("/api/postUser/", (req, res) => {
    const { userName, userPass, userPhone, userAdress } = req.body;
    const newUser = {
      login: userName,
      password: userPass,
      description: "No description",
      phone: userPhone,
      adress: userAdress,
      photo: "https://gp2dzm.ru/wp-content/uploads/2018/11/no-photo-male.jpg",
      cartItems: [] as ICartItem[],
    };
    console.log(newUser);
    users.push(newUser);
    fs.writeFileSync("./src/api/users.json", JSON.stringify(users));
    res.status(201).json(newUser);
  });

  app.post("/api/saveUser/", (req, res) => {
    const { userNamePrev, userNameNew, userDescription, userPhone, userAdress, userPhoto, usercartItems } = req.body;
    const resultUsers = users.map((user) => {
      if (user.login === userNamePrev) {
        return {
          ...user,
          login: userNameNew,
          description: userDescription,
          phone: userPhone,
          adress: userAdress,
          photo: userPhoto,
          cartItems: usercartItems,
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
  app.get(
    "/api/getGames/",
    (
      // eslint-disable-next-line default-param-last
      req: { query: { platform?: string; genre?: string; age?: string; sortBy?: string; orderBy?: string } } = {
        query: {
          platform: "desktop",
          genre: "",
          age: "",
          sortBy: "name",
          orderBy: "ASC",
        },
      },
      res
    ) => {
      let resultArr = [...games];
      const { platform, genre, age, sortBy, orderBy } = req.query;
      if (platform) resultArr = resultArr.filter((game) => game.platforms.includes(platform.toString()));
      if (genre) resultArr = resultArr.filter((game) => game.genre === genre);
      if (age) resultArr = resultArr.filter((game) => game.age === Number(age));
      resultArr.sort((game1, game2) => {
        switch (sortBy) {
          case "name": {
            if (game1.name.toLowerCase() > game2.name.toLowerCase()) return orderBy === "asc" ? 1 : -1;
            if (game1.name.toLowerCase() < game2.name.toLowerCase()) return orderBy === "asc" ? -1 : 1;
            if (game1.name.toLowerCase() === game2.name.toLowerCase()) return 0;
            break;
          }
          case "price": {
            if (game1.price > game2.price) return orderBy === "asc" ? 1 : -1;
            if (game1.price < game2.price) return orderBy === "asc" ? -1 : 1;
            if (game1.price === game2.price) return 0;
            break;
          }
          case "rating": {
            if (game1.rating > game2.rating) return orderBy === "asc" ? -1 : 1;
            if (game1.rating < game2.rating) return orderBy === "asc" ? 1 : -1;
            if (game1.rating === game2.rating) return 0;
            break;
          }
          default:
            break;
        }
        return 0;
      });
      setTimeout(() => {
        res.json(resultArr);
      }, 500);
    }
  );
  app.get("/api/getCartItems/", (req, res) => {
    const { login } = req.query;
    let resultArr;
    users.forEach((user) => {
      if (user.login === login) resultArr = user.cartItems;
    });
    res.status(201).json(resultArr);
  });
  app.post("/api/updateCartItems/", (req, res) => {
    const { cartItems, login } = req.body;
    users.forEach((user) => {
      if (user.login === login) {
        // eslint-disable-next-line no-param-reassign
        user.cartItems = cartItems;
      }
      return user;
    });
    fs.writeFileSync("./src/api/users.json", JSON.stringify(users));
    res.status(201).end();
  });
  app.post("/api/buyCartItems", (req, res) => {
    const { cartItems, login } = req.body;
    console.log(cartItems);
    users.forEach((user) => {
      if (user.login === login) {
        // eslint-disable-next-line no-param-reassign
        user.cartItems = [];
      }
      return user;
    });
    res.status(201).json("Success");
  });
});
