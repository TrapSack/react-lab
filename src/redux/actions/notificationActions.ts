import { IChangeNotificationAction, NotificationTypes } from "../types/notificationTypes";

export default function changeNotification(type: string, text: string): IChangeNotificationAction {
  return {
    type: NotificationTypes.CHANGE,
    payload: {
      type,
      text,
    },
  };
}
