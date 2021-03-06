import { INotificationAction, INotificationState, NotificationTypes } from "../types/notificationTypes";

const initialState: INotificationState = {
  text: "",
  type: "",
};

// eslint-disable-next-line default-param-last
export default function notificationReducer(state: INotificationState = initialState, action: INotificationAction) {
  switch (action.type) {
    case NotificationTypes.CHANGE:
      return { type: action.payload.type, text: action.payload.text };
    default:
      return state;
  }
}
