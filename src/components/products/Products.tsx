import { useSelector } from "react-redux";
import { useState } from "react";
import SearchField from "../../elements/searchField";
import GamesContainer from "../../elements/gamesContainer/gamesContainer";
import { RootReducerType } from "../../redux/reducers/rootReducer";
import AddCardModal from "../../elements/modals/addCardModal";
import SortField from "./sortField";
import products from "./products.module.scss";

export default function Products() {
  const user = useSelector((state: RootReducerType) => state.user);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className={products.products}>
        <SearchField />
        {user.stuff && (
          <button
            className={products["products__add-item-btn"]}
            onClick={() => {
              setShowModal(true);
            }}
            type="button"
          >
            Add product
          </button>
        )}
        <div className={products.products__main}>
          <SortField />
          <GamesContainer home={false} />
        </div>
      </div>
      <AddCardModal setShowModal={setShowModal} showModal={showModal} title="Add new game" />
    </>
  );
}
