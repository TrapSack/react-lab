import { IGame } from "./interfaces";
import GameCard from "./gameCard";
import NoMatchesParagraph from "../../../elements/noMatchesParagraph";

interface IGamesContainer {
  gamesArr: IGame[];
}

export default function GamesContainer(props: IGamesContainer): JSX.Element {
  const gameComponentArray = props.gamesArr.map((game) => (
    <GameCard
      key={game.id}
      id={game.id}
      name={game.name}
      rating={game.rating}
      price={game.price}
      cover={game.cover}
      description={game.description}
    />
  ));
  return (
    <div className="home__games-container">
      {gameComponentArray.length > 0 ? gameComponentArray : <NoMatchesParagraph />}
    </div>
  );
}
