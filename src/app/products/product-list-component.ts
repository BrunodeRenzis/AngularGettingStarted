import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./IProduct";
import { ProductService } from "./product.service";

@Component({
    selector:'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list-component.css']
    
})
export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle:string = "Product list";
    imageWidth:number=50;
    imageHeight:number=50;
    imageMargin:number=2;
    showImage:boolean=true;
    errorMessage:string='';
    sub!: Subscription;
    filterProducts:IProduct[] = [];
    products: IProduct[] = [];
    private _listFilter:string = '';
    constructor(private productService:ProductService ){}
    
    get listFilter():string{
      return this._listFilter;
    }
    
    performFilter(filterBy:string):IProduct[]{
      filterBy = filterBy.toLowerCase();
      return this.products.filter((product:IProduct)=>product.productName.toLocaleLowerCase().includes(filterBy));
    }

    set listFilter(value:string){
      this._listFilter=value;
      console.log("in setter: ",value);
      this.filterProducts = this.performFilter(value);
    }

      ngOnInit():void{
        this.sub = this.productService.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filterProducts = this.products;
          },
          error: err => this.errorMessage = err
        });
      }

      toggleImage():void{
          this.showImage=!this.showImage
      }
      

      onRatingClicked(message:string):void{
        this.pageTitle = 'Product List: '+ message;
      }

      ngOnDestroy(): void {
        this.sub.unsubscribe();
        
      }
}