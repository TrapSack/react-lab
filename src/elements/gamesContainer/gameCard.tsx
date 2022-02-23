import changeNotification from "@/redux/actions/notificationActions";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { IGame } from "@/redux/types/gamesTypes";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, updateOrderAmount } from "../../helpers/orderFunctions";
import "../elementStyles.scss";

export default function GameCard(props: IGame) {
  const [descriptionShow, setDescriptionShow] = useState<string>(() => "game-card__description");
  const [isInCart, setIsIncart] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootReducerType) => state.user);
  function setShowDescription() {
    setDescriptionShow("game-card__description active");
  }
  function setHideDescription() {
    setDescriptionShow("game-card__description");
  }

  function handleClick() {
    if (user.isAuth) {
      if (!isInCart) {
        addOrder(user.login, props.name, props.platforms[0], props.price);
        setIsIncart(true);
        dispatch(changeNotification("success", `${props.name} has been added to your cart`));
      } else {
        updateOrderAmount(props.name, user.login);
        dispatch(changeNotification("success", `You have added 1 more game to ${props.name}`));
      }
    } else {
      dispatch(changeNotification("danger", "please, Login or register first"));
    }
  }

  return (
    <div className="game-card" onMouseEnter={setShowDescription} onMouseLeave={setHideDescription}>
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
            case "xbox":
              return (
                <img
                  key={platform}
                  className="game-card__platform"
                  src="https://www.freepnglogos.com/uploads/xbox-logo-black-png-7.png"
                  alt="xbox"
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
        <button type="button" className="game-card__add-to-cart-btn" onClick={handleClick}>
          BUY
        </button>
      </div>
      <div className={descriptionShow}>{props.description}</div>
    </div>
  );
}
