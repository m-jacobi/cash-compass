import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subject } from 'rxjs/internal/Subject';
import { CategoryService } from '../../core/data-access/services/category/category.service';
import { CategoryModel } from '../../core/models/category.model';

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
        public modalRef: MatDialogRef<CategoryModalDialogComponent, CategoryModel>,
        @Inject(MAT_DIALOG_DATA) public data: CategoryModel
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
        const category: CategoryModel = {
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
