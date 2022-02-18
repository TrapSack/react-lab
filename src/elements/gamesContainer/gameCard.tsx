import { IGame } from "@/redux/types/gamesTypes";
import { useState } from "react";

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
      <div className="game-card__platforms">
        {props.platforms.map((platform) => {
          switch (platform) {
            case "playstation":
              return (
                <img
                  key={platform}
                  className="game-card__platform"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1280px-PlayStation_logo.svg.png"
                  alt="playstation"
                />
              );
            case "Xbox":
              return (
                <img
                  key={platform}
                  className="game-card__platform"
                  src="https://www.freepnglogos.com/uploads/xbox-logo-black-png-7.png"
                  alt="Xbox"
                />
              );
            case "desktop": {
              return (
                <img
                  key={platform}
                  className="game-card__platform"
                  src="https://icon-library.com/images/desktop-icon-png/desktop-icon-png-23.jpg"
                  alt="desktop"
                />
              );
            }
            default:
              return platform;
          }
        })}
      </div>
      <img src={props.cover} alt={props.name} className="game-card__cover" />
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
