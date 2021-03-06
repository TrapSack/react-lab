import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import elementStyles from "../elementStyles.module.scss";
import EditModal from "../modals/editModal";
import { addCartItem, updateCartItemAmount } from "../../redux/actions/cartItemsActions";
import { RootReducerType } from "../../redux/reducers/rootReducer";
import { IGame } from "../../redux/types/gamesTypes";
import changeNotification from "../../redux/actions/notificationActions";

export default function GameCard(props: IGame) {
  const [descriptionShow, setDescriptionShow] = useState<string>(() => elementStyles["game-card__description"]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootReducerType) => state.user);
  const cardItems = useSelector((state: RootReducerType) => state.cardItems);
  function setShowDescription() {
    setDescriptionShow(`${elementStyles["game-card__description"]} ${elementStyles.active}`);
  }
  function setHideDescription() {
    setDescriptionShow(`${elementStyles["game-card__description"]}`);
  }

  function handleShowModalClick() {
    setShowModal(true);
  }

  function handleClickToCart() {
    if (user.isAuth) {
      if (!cardItems.some((order) => order.name === props.name)) {
        dispatch(addCartItem(props.name, props.platforms[0], props.price, props.cover));
        dispatch(changeNotification("success", `${props.name} has been added to your cart`));
      } else {
        dispatch(updateCartItemAmount(props.name));
        dispatch(changeNotification("success", `You have added 1 more game to ${props.name}`));
      }
    } else {
      dispatch(changeNotification("danger", "please, Login or register first"));
    }
  }
  return (
    <>
      <div
        className={elementStyles["game-card"]}
        onMouseEnter={setShowDescription}
        id={props.id}
        onMouseLeave={setHideDescription}
      >
        <div className={elementStyles["game-card__platforms"]}>
          {props.platforms.map((platform) => {
            switch (platform) {
              case "playstation":
                return (
                  <img
                    key={platform}
                    className={elementStyles["game-card__platform"]}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1280px-PlayStation_logo.svg.png"
                    alt="playstation"
                  />
                );
              case "xbox":
                return (
                  <img
                    key={platform}
                    className={elementStyles["game-card__platform"]}
                    src="https://www.freepnglogos.com/uploads/xbox-logo-black-png-7.png"
                    alt="xbox"
                  />
                );
              case "desktop": {
                return (
                  <img
                    key={platform}
                    className={elementStyles["game-card__platform"]}
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
        <div className={elementStyles["game-card__image-description-container"]}>
          <div className={descriptionShow}>{props.description}</div>
          <img src={props.cover} alt={props.name} className={elementStyles["game-card__cover"]} />
        </div>
        <div className={elementStyles["game-card__info"]}>
          <span className={elementStyles["game-card__title"]}>{props.name}</span>
          <span className={elementStyles["game-card__price"]}>Price {props.price.toFixed(2)}$</span>
        </div>
        <div className={elementStyles["game-card__rating"]}>
          <img
            src="https://www.pngplay.com/wp-content/uploads/8/5-Stars-PNG-HD-Quality.png"
            alt=""
            className={elementStyles["game-card__stars"]}
          />
          {user.stuff && (
            <button
              type="button"
              className={elementStyles["game-card__add-to-cart-btn"]}
              onClick={handleShowModalClick}
            >
              edit
            </button>
          )}
          <button type="button" className={elementStyles["game-card__add-to-cart-btn"]} onClick={handleClickToCart}>
            BUY
          </button>
        </div>
      </div>
      <EditModal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Edit"
        id={props.id}
        name={props.name}
        age={props.age}
        rating={props.rating}
        releaseDate={props.releaseDate}
        description={props.description}
        genre={props.genre}
        image={props.cover}
        platforms={props.platforms}
        price={props.price.toString()}
      />
    </>
  );
}
