export interface INotificationState {
  type: string;
  text: string;
}

export const enum NotificationTypes {
  CHANGE = "NOTIFICATION/change",
}

export type INotificationAction = IChangeNotificationAction;

export interface IChangeNotificationAction {
  type: NotificationTypes.CHANGE;
  payload: {
    type: string;
    text: string;
  };
}
