import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './feature-modules/category/components/category-list/category-list.component';
import { PaymentListComponent } from './feature-modules/payment/components/payment-list/payment-list.component';


const routes: Routes = [
    {
        path: '',
        component: PaymentListComponent,
    },
    {
        path: 'payments',
        component: PaymentListComponent,
    },
    {
        path: 'categories',
        component: CategoryListComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
