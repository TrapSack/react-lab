import { RootReducerType } from "@/redux/reducers/rootReducer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  const classList = `notification ${
    notification.type === "success" ? "notification--success" : "notification--danger"
  }`;
  return show ? (
    <div className={classList}>
      <p className="notification__text">{notification.text}</p>
    </div>
  ) : null;
}
