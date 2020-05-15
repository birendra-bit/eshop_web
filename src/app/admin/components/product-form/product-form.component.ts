import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/business/category.service';
import { ProductService } from 'src/app/shared/services/business/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories: Category[];
  product: Product;
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
  
    this.categoryService.getData().subscribe((category:Category[])=>{
      this.categories = category
    })
      this.route.paramMap.subscribe(params=>{
        this.productId = params.get('id');
        if(this.productId){ 
          this.productService.getDataByID(this.productId).subscribe((product:Product)=>{
            this.product = product;
          })
        }
      });
  }

  ngOnDestroy(){
  }
}
const initialState={
  _id:'', 
  category:'',
  imageUrl:'',
  price: 0,
  title: '',
  createOn: ''
}