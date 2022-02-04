// import { IGame } from "./interfaces";
// import GameCard from "./gameCard";

// interface IGamesContainer {
//   // gamesArr: IGame[];
// }

export default function GamesContainer(): JSX.Element {
  // const gameComponentArray = props.gamesArr.map((game) => (
  //   <GameCard
  //     key={game.id}
  //     name={game.name}
  //     rating={game.rating}
  //     price={game.price}
  //     cover={game.cover}
  //     description={game.description}
  //   />
  // ));

  return (
    <div className="home__games-container">
      {/* <GameCard />
      <GameCard />
      <GameCard /> */}
      Game card
    </div>
  );
}
