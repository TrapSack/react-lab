import "./profile.scss";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { useSelector } from "react-redux";
import Modal from "@/elements/modal";
import { useState } from "react";
import PasswordChangeForm from "./forms/passwordChangeForm";
import InfoChangeForm from "./forms/infoChangeForm";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootReducerType) => state.user);
  return (
    <div className="profile">
      <div className="profile__information-container">
        <h2>{user.login}</h2>
        <p className="profile__description">{user.description}</p>
        <button
          className="profile__change-info-btn"
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Change Info
        </button>
      </div>
      <Modal open={isOpen} setIsOpen={setIsOpen} title="Change info">
        <InfoChangeForm />
      </Modal>
      <PasswordChangeForm />
    </div>
  );
}
