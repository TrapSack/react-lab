import { useState } from "react";
import { IGame } from "./interfaces";

export default function GameCard(props: IGame) {
  const [descriptionShow, setDescriptionShow] = useState<string>(() => "game-card__description");

  function setShowDescription() {
    setDescriptionShow("game-card__description active");
  }
  function setHideDescription() {
    setDescriptionShow("game-card__description");
  }

  return (
    <div
      className="game-card"
      // onClick={() => {
      //   alert("CLICKED");
      // }}
      onMouseEnter={setShowDescription}
      onMouseLeave={setHideDescription}
    >
      <img src={props.cover} alt="overwatch" className="game-card__cover" />
      <div className="game-card__info">
        <span className="game-card__title">{props.name}</span>
        <span className="game-card__price">Price {props.price}$</span>
      </div>
      <div className="game-card__rating">
        <img
          src="https://www.pngplay.com/wp-content/uploads/8/5-Stars-PNG-HD-Quality.png"
          alt=""
          className="game-card__stars"
        />
        <button type="button" className="game-card__add-to-cart-btn">
          BUY
        </button>
      </div>
      <div className={descriptionShow}>{props.description}</div>
    </div>
  );
}
