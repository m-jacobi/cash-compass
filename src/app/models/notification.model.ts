import { NOTIFICATION_TYPE } from '../enum/notification-type.enum';

export interface NotificationModel {
    notificationType: NOTIFICATION_TYPE,
    message: string,
    buttonText: string,
}
