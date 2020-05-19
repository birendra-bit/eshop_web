import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/business/category.service';
import { ProductService } from 'src/app/shared/services/business/product.service';
import { Category } from './../../../shared/models/category';
import { Product } from './../../../shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories: Category[];
  product: Product = new initialState();
  productId;

  constructor( 
    private categoryService:CategoryService, 
    private productService:ProductService,
    private router: Router,
    private route:ActivatedRoute ) {}

   save(product){
     if( this.productId) this.productService.updateData( this.productId,product).subscribe(res=>{
       console.log(res);
      this.router.navigate(['/admin/products']);
     })
      else
      this.productService.createData(product).subscribe(res=>{
        console.log(res);
        this.router.navigate(['/admin/products']);
      })
   }

   delete(){
     if(!confirm('Are you sure you want to delete the product')) return;
     this.productService.deleteData(this.productId).subscribe(res=>{
       console.log(res);
      this.router.navigate(['/admin/products']);
     })
   }

  ngOnInit() {
    this.categoryService.getData().subscribe(category=>{
      this.categories = category.data as Category[]
    })
      this.route.paramMap.subscribe(params=>{
        this.productId = params.get('id');
        if(this.productId){ 
          this.productService.getDataByID(this.productId).subscribe(product=>{
            this.product = product.data as Product
          })
        }
      });
  }

  ngOnDestroy(){
  }
}
class initialState {
  _id:string='';
  category:string='';
  imageUrl:string='';
  price: number=0;
  title: string='';
  createOn: Date = new Date;
  constructor(){}
}