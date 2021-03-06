import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
	SharedModule,
	RouterModule.forChild([
	{ path: 'products', component: ProductListComponent},
	{ path: 'products/:id', 
	  canActivate: [ ProductDetailGuard ],
	  component: ProductDetailComponent}
	])
  ],
  declarations: [
	ProductListComponent,
	ProductDetailComponent
  ]
})
export class ProductModule { }
