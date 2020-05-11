import { Category } from './../../../../shared/models/category';
import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/business/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$: Category[]=[];
  @Input('category') category;
  constructor(private categoryService: CategoryService) {
    // let categoryArr = [];
    // this.categoryService.getCategories().snapshotChanges()
    //   .subscribe(cat => {
    //     cat.forEach(c => categoryArr.push({ key: c.key, ...c.payload.val() }))
    //     this.categories$ = [...categoryArr];
    //   })

  }

  ngOnInit(): void {
    this.categoryService.getData().subscribe((category:Category[])=>{
      this.categories$ = category
    })
  }
}
