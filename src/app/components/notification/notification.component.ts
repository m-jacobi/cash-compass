import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacySnackBarRef as MatSnackBarRef, MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA } from '@angular/material/legacy-snack-bar';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: any,
        public snackBarRef: MatSnackBarRef<NotificationComponent>) { }

    public ngOnInit(): void {
    }

}
