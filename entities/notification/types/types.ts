export type NotificationType = 
  | "BID_ACCEPTED"
  | "NEW_REQUEST"
  | "PAYMENT_CONFIRMED"
  | "DELIVERY_COMPLETED"
  | "SYSTEM_ALERT";

export interface Notification {
  id: string;
  userId: string; // recipient
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  relatedEntityId?: string; // e.g., requestId or bidId
}

export interface GetNotificationsParams {
  userId: string;
  page?: number;
  limit?: number;
}
export interface CreateNotificationInput {
  userId: string;
  title: string;
  message: string;
  type: NotificationType; // make sure NotificationType is imported
  relatedEntityId?: string;
}