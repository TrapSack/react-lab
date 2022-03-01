import SearchField from "@/elements/searchField";
import GamesContainer from "@/elements/gamesContainer/gamesContainer";
import "./products.scss";
import SortField from "./sortField";
import { useSelector } from "react-redux";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { useState } from "react";
import AddCardModal from "@/elements/addCardModal";

export default function Products() {
  const user = useSelector((state: RootReducerType) => state.user);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="products">
        <SearchField />
        {user.isAuth && (
          <button
            className="products__add-item-btn"
            onClick={() => {
              setShowModal(true);
            }}
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
