import { useState } from "react";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../redux/reducers/rootReducer";
import Modal from "../../elements/modals/modal";
import InfoChangeForm from "./forms/infoChangeForm";
import PasswordChangeForm from "./forms/passwordChangeForm";
import profile from "./profile.module.scss";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootReducerType) => state.user);
  return (
    <div className={profile.profile}>
      <div className={profile["profile__information-container"]}>
        <h2>{user.login}</h2>
        <span>Desctiprion</span>
        <p className={profile.profile__description}>{user.description}</p>
        <span>Phone</span>
        <p className={profile.profile__phone}>{user.phone}</p>
        <span>Adress</span>
        <p className={profile.profile__adress}>{user.adress}</p>
        <span>Photo</span>
        <img src={user.photo.toString()} alt="" className={profile.profile__photo} />
        <button
          className={profile["profile__change-info-btn"]}
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
