import SearchField from "@/elements/searchField";
import GamesContainer from "@/elements/gamesContainer/gamesContainer";
import "./products.scss";
import { useSelector } from "react-redux";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { useState } from "react";
import AddCardModal from "@/elements/modals/addCardModal";
import SortField from "./sortField";

export default function Products() {
  const user = useSelector((state: RootReducerType) => state.user);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="products">
        <SearchField />
        {user.stuff && (
          <button
            className="products__add-item-btn"
            onClick={() => {
              setShowModal(true);
            }}
            type="button"
          >
            Add product
          </button>
        )}
        <div className="products__main">
          <SortField />
          <GamesContainer home={false} />
        </div>
      </div>
      <AddCardModal setShowModal={setShowModal} showModal={showModal} title="Add new game" />
    </>
  );
}
