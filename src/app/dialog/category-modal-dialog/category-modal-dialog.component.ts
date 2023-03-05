import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-modal-dialog',
  templateUrl: './category-modal-dialog.component.html',
  styleUrls: ['./category-modal-dialog.component.scss']
})
export class CategoryModalDialogComponent implements OnInit, OnDestroy {

    public categoryForm: FormGroup;
    private readonly ngDestroy = new Subject<void>();

    constructor(
        private categoryService: CategoryService,
        public modalRef: MatDialogRef<CategoryModalDialogComponent, Category>,
        @Inject(MAT_DIALOG_DATA) public data: Category
    ) {
        this.categoryForm = new FormGroup({
            name: new FormControl(this.data.name, Validators.required)
        });
    }

    public ngOnInit(): void {
    }

    public get formControl() {
        return this.categoryForm.controls;
    }

    public saveCategory(): void {
        const category: Category = {
            id: this.data.id,
            name: this.formControl['name'].value,
            defaultCategory: this.data.defaultCategory,
        }

        if(this.data.id) {
            this.categoryService.updateCategory(category);
        } else {
            this.categoryService.createCategory(category);
        }
        this.onClose();
    }

    public onClose(): void {
        this.modalRef.close();
    }

    public ngOnDestroy(): void {
        this.ngDestroy.next();
        this.ngDestroy.unsubscribe();
    }

}
