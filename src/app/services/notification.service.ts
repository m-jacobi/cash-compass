import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../components/notification/notification.component';
import { NotificationModel } from '../models/notification.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private matSnackBar: MatSnackBar) { }

    public showNotification(notification: NotificationModel): void {
        this.matSnackBar.openFromComponent(NotificationComponent, {
            data: {
                message: notification.message,
                buttonText: notification.buttonText
            },
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: notification.notificationType
        });
    }
}
