import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import elementStyles from "./elementStyles.module.scss";
import { RootReducerType } from "../redux/reducers/rootReducer";

export default function NotificationComponent() {
  const notification = useSelector((state: RootReducerType) => state.notification);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (notification.text) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [notification]);
  const classList = `${elementStyles.notification} ${
    notification.type === "success" ? elementStyles["notification--success"] : elementStyles["notification--danger"]
  }`;
  return show ? (
    <div className={classList}>
      <p className={elementStyles.notification__text}>{notification.text}</p>
    </div>
  ) : null;
}
