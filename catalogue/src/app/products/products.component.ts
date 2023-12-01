
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { PageProduct, Product } from '../Model/Product.moodel';

import { Observable, of, throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Array<Product> ;
  currentPage : number = 0 ;
  pageSize : number = 5 ;
  totalPages : number = 0 ; 
  errorMessage!: string ;
  searchFormGroup !: FormGroup ;
  currentAction : string  = 'all' ;
  i: any;



  constructor(private productService : ProductService, private fb:FormBuilder , private router: Router ,
    public authService : AuthenticationService){}

  ngOnInit() : void{
   this.searchFormGroup = this.fb.group ( {
    keyword : this.fb.control (null)
      }) ;
     this.handleGetPageProducts() ;

    }


    handleGetPageProducts(){

      this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe(   {

        next : (data:PageProduct) =>{
          this.products=data.products;
          this.totalPages = data.totalPages ;
          console.log (this.totalPages) ;
        },
        
        error : (err)=>{
        this.errorMessage=err ;
        }
        }) ;
      }


      handleGetAllProducts(){

      this.productService.getAllProducts().subscribe(   {

        next : (data:Product[]) =>{
          this.products=data;
        },
        
        error : (err)=>{
        this.errorMessage=err ;
        }
        }) ;
      }
    

   handleDeleteProduct(p:Product){

    let conf =confirm("etes vous sur ?")
    if (conf==false) return ;
   this.productService.deleteProduct(p.id).subscribe({
    next : (data: any) =>{
let index = this.products.indexOf(p) ;
this.products.splice(index);
  }
})
}


handleSetPromotion(p: Product) {
  let promo = p.promotion ;
this.productService.setPromotion(p.id).subscribe({
  next : (data:boolean)=>{
    p.promotion=!promo;
  },
  
  error : (err)=>{
  this.errorMessage=err ;
  }
  }) ;
}

handleSearchProducts(){
  this.currentAction="Search" ;
  this.currentPage = 0 ;

let keyword = this.searchFormGroup.value.keyword ;
this.productService.searchProducts(keyword,this.currentPage, this.pageSize).subscribe({

  next : (data:PageProduct) =>{
    this.products = data.products ;
    this.totalPages = data.totalPages ;
  }
})
}
gotoPage(i:number){
  this.currentPage=i ;
  if(this.currentAction === 'all')
  this.handleGetPageProducts  () ;
  else 
  this.handleSearchProducts () ; 
}

handleNewProducts()
{ this.router.navigateByUrl("/admin/newProduct") ;
 }

 handleEditProduct(p : Product){
this.router.navigateByUrl("admin/editProduct/"+p.id) ; 

 }




}
