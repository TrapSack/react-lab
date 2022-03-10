/* eslint-disable react/jsx-no-bind */
import { removeGame, updateGame } from "@/redux/actions/gamesActions";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FormOption from "../form-options/formOption";
import ConfirmDeletionModal from "./confirmDeletionModal";
import Modal from "./modal";
import elementStyles from "../elementStyles.module.scss";

interface IEditModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  id: string;
  name: string;
  genre: string;
  rating: number;
  price: string;
  image: string;
  description: string;
  releaseDate: string;
  age: number;
  platforms: Array<string>;
}

export default function EditModal(props: IEditModalProps) {
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState({
    name: props.name,
    genre: props.genre,
    price: props.price,
    image: props.image,
    description: props.description,
    age: props.age,
    platforms: props.platforms,
  });
  const [error, setError] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  function handleSubmitChangeCard(e: FormEvent) {
    e.preventDefault();
    if (
      (cardData.age === props.age &&
        cardData.description === props.description &&
        cardData.genre === props.genre &&
        cardData.image === props.image &&
        cardData.name === props.name &&
        cardData.platforms === props.platforms &&
        cardData.price === props.price) ||
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
      cardData.price === "0" ||
      !cardData.price.toString().trim()
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
      updateGame(
        props.id,
        cardData.name,
        parseFloat(cardData.price.toString()),
        props.rating,
        cardData.age,
        cardData.genre,
        props.releaseDate,
        cardData.platforms,
        cardData.image,
        cardData.description
      )
    );
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
  function handleRemoveCardClick() {
    setShowConfirmationModal(true);
    // props.setShowModal(false);
  }
  useEffect(() => {
    if (isConfirmed) dispatch(removeGame(props.id));
  }, [isConfirmed]);
  return (
    <>
      <Modal open={props.showModal} setIsOpen={props.setShowModal} title={props.title}>
        <form className={elementStyles["add-edit-form"]} onSubmit={handleSubmitChangeCard}>
          <img src={cardData.image} alt="" className={elementStyles["add-edit-form__cover"]} />
          <div className={elementStyles["add-edit-form__option-container"]}>
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
              placeholder="Price"
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
            <label htmlFor={elementStyles.age} className={elementStyles["add-edit-form__select"]}>
              Age
              <select name="age" id={elementStyles.age} defaultValue={props.age} onChange={handleCartAgeChange}>
                <option value="6">6+</option>
                <option value="12">12+</option>
                <option value="16">16+</option>
                <option value="18">18+</option>
              </select>
            </label>
            <span>Platform</span>
            <label htmlFor={elementStyles.Desktop} className={elementStyles["add-edit-form__checkbox"]}>
              Desktop
              <input
                type="checkbox"
                id={elementStyles.Desktop}
                name="desktop"
                defaultChecked={cardData.platforms.some((platform) => platform === "desktop")}
                onChange={handleCardPlatformsChange}
              />
            </label>
            <label htmlFor={elementStyles.PS5} className={elementStyles["add-edit-form__checkbox"]}>
              PS5
              <input
                type="checkbox"
                id={elementStyles.PS5}
                name="playstation"
                onChange={handleCardPlatformsChange}
                defaultChecked={cardData.platforms.some((platform) => platform === "playstation")}
              />
            </label>
            <label htmlFor={elementStyles.Xbox} className={elementStyles["add-edit-form__checkbox"]}>
              Xbox
              <input
                type="checkbox"
                id={elementStyles.Xbox}
                name="xbox"
                onChange={handleCardPlatformsChange}
                defaultChecked={cardData.platforms.some((platform) => platform === "xbox")}
              />
            </label>
            {error && <span className={elementStyles["form__input-error"]}>{error}</span>}
            <div className={elementStyles["add-edit-form__btn-container"]}>
              <button type="submit" className={elementStyles["add-edit-form__btn"]}>
                Submit
              </button>
              <button type="button" className={elementStyles["add-edit-form__btn"]} onClick={handleRemoveCardClick}>
                Delete card
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <ConfirmDeletionModal
        setShowModal={setShowConfirmationModal}
        showModal={showConfirmationModal}
        game={props.name}
        setConfirm={setIsConfirmed}
      />
    </>
  );
}
