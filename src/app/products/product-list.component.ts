import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    //selector: 'pm-products',
    templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Liste des produits';   
	imageWidth: number = 50;
	imageMargin: number = 2;
	showImage: boolean = false;
	_listFilter: string;
	errorMessage : string;
	
	filteredProducts : IProduct[];
	products: IProduct[];
	
	constructor(private productService : ProductService) {
		
	}
	
	/*
	* Getters et setters
	*
	*/
	get listFilter(): string {
		return this._listFilter;
	}
	set listFilter(value : string) {
		this._listFilter = value;
		this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
	}
	
	/*
	* Manipulations DOM
	*
	*/
	
	toggleImage(): void {
		this.showImage = !this.showImage;
	}
	
	/*
	* Methode interne
	*
	*/
	
	OnRatingClicked(message : string) : void {
		this.pageTitle = message;
	}
	
	performFilter(filterBy : string) : IProduct[] {
		filterBy = filterBy.toLocaleLowerCase();
		return this.products.filter((product: IProduct) =>
			product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
	}
	
	/*
	* Lifecycle hook
	*
	*/
	
	ngOnInit(): void {
		this.productService.getProducts().subscribe(
			products => {
				this.products = products,
				this.filteredProducts = products;
			},
			error => this.errorMessage = <any>error
		);
		this.listFilter = '';
	}
}