/* eslint-disable react/jsx-no-bind */
import { addGame } from "@/redux/actions/gamesActions";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import FormOption from "../form-options/formOption";
import Modal from "./modal";

export default function AddCardModal(props: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  title: string;
}) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [cardData, setCardData] = useState(() => ({
    name: "",
    genre: "",
    price: "0",
    image: "",
    description: "",
    age: 6,
    platforms: [],
  }));
  function handleSubmitChangeCard(e: FormEvent) {
    e.preventDefault();
    if (
      !cardData.age ||
      !cardData.age.toString().trim() ||
      !cardData.description ||
      !cardData.description.trim() ||
      !cardData.genre ||
      !cardData.genre.trim() ||
      !cardData.image ||
      !cardData.image.trim() ||
      !cardData.name ||
      !cardData.name.trim() ||
      !cardData.platforms.length ||
      !cardData.price ||
      !cardData.price.trim()
    ) {
      setError("All fields must be filled");
      return;
    }

    if (!/^\d+\.?\d*$/gm.test(cardData.price) || parseInt(parseInt(cardData.price, 10).toFixed(0), 10) === 0) {
      setError("Please, input correct price");
      return;
    }
    setError("");

    dispatch(
      addGame(
        cardData.name,
        parseFloat(cardData.price.toString()),
        cardData.age,
        cardData.genre,
        cardData.platforms,
        cardData.image,
        cardData.description
      )
    );
    setCardData({
      name: "",
      genre: "",
      price: "0",
      image: "",
      description: "",
      age: 6,
      platforms: [],
    });
    props.setShowModal(false);
  }
  function handleChangeCardDataState(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    if (name === "price") {
      if (!/^\d+\.?\d*$/gm.test(value)) {
        setError("Please, input correct price");
      } else {
        setError("");
      }
    }
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleCartAgeChange(e: ChangeEvent<HTMLSelectElement>) {
    setCardData((prev) => ({
      ...prev,
      age: parseInt(e.target.value, 10),
    }));
  }
  function handleCardPlatformsChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked)
      setCardData((prev) => ({
        ...prev,
        platforms: [...prev.platforms, e.target.name],
      }));
    else
      setCardData((prev) => ({
        ...prev,
        platforms: prev.platforms.filter((platform) => platform !== e.target.name),
      }));
  }
  return (
    <Modal open={props.showModal} setIsOpen={props.setShowModal} title={props.title}>
      <form className="add-edit-form" onSubmit={handleSubmitChangeCard}>
        <div className="add-edit-form__option-container">
          <FormOption
            type="text"
            inputName="name"
            placeholder="Name"
            handleChange={handleChangeCardDataState}
            value={cardData.name}
          />
          <FormOption
            type="text"
            inputName="genre"
            placeholder="Genre"
            handleChange={handleChangeCardDataState}
            value={cardData.genre}
          />
          <FormOption
            type="text"
            inputName="price"
            placeholder="Price($)"
            handleChange={handleChangeCardDataState}
            value={cardData.price.toString()}
          />
          <FormOption
            type="text"
            inputName="image"
            placeholder="Cover"
            handleChange={handleChangeCardDataState}
            value={cardData.image}
          />
          <FormOption
            type="text"
            inputName="description"
            placeholder="Description"
            handleChange={handleChangeCardDataState}
            value={cardData.description}
          />
          <label htmlFor="age" className="add-edit-form__select">
            Age
            <select name="age" id="age" defaultValue={cardData.age} onChange={handleCartAgeChange}>
              <option value="6">6+</option>
              <option value="12">12+</option>
              <option value="16">16+</option>
              <option value="18">18+</option>
            </select>
          </label>
          <span>Platform</span>
          <label htmlFor="Desktop" className="add-edit-form__checkbox">
            Desktop
            <input
              type="checkbox"
              id="Desktop"
              name="desktop"
              defaultChecked={cardData.platforms.some((platform) => platform === "desktop")}
              onChange={handleCardPlatformsChange}
            />
          </label>
          <label htmlFor="PS5" className="add-edit-form__checkbox">
            PS5
            <input
              type="checkbox"
              id="PS5"
              name="playstation"
              onChange={handleCardPlatformsChange}
              defaultChecked={cardData.platforms.some((platform) => platform === "playstation")}
            />
          </label>
          <label htmlFor="Xbox" className="add-edit-form__checkbox">
            Xbox
            <input
              type="checkbox"
              id="Xbox"
              name="xbox"
              onChange={handleCardPlatformsChange}
              defaultChecked={cardData.platforms.some((platform) => platform === "xbox")}
            />
          </label>
          {error && <span className="form__input-error">{error}</span>}
          <div className="add-edit-form__btn-container">
            <button type="submit" className="add-edit-form__btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
