import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ NotificationComponent ],
            imports: [MatSnackBarModule]
        })
        .compileComponents();

        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
