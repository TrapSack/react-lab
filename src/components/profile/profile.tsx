import "./profile.scss";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { useSelector } from "react-redux";
import Modal from "@/elements/modal";
import { useState } from "react";
import InfoChangeForm from "./forms/infoChangeForm";
import PasswordChangeForm from "./forms/passwordChangeForm";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootReducerType) => state.user);
  return (
    <div className="profile">
      <div className="profile__information-container">
        <h2>{user.login}</h2>
        <span>Desctiprion</span>
        <p className="profile__description">{user.description}</p>
        <span>Phone</span>
        <p className="profile__phone">{user.phone}</p>
        <span>Adress</span>
        <p className="profile__adress">{user.adress}</p>
        <span>Photo</span>
        <img src={user.photo.toString()} alt="" className="profile__photo" />
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
        <InfoChangeForm setIsOpen={setIsOpen} />
      </Modal>
      <PasswordChangeForm />
    </div>
  );
}
