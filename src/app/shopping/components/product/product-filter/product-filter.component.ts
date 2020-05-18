import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/business/category.service';
import { Category } from './../../../../shared/models/category';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$: Category[];
  @Input('category') category;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getData().subscribe(category=>{
      this.categories$ = category.data as Category[]
    })
  }
}
