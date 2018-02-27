import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.css']
})
export class CategorySelectComponent implements OnInit {

  categories: any;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  select(category) {
    this.change.emit(category);
  }
  constructor(private categoryServie: CategoryService) {
    this.categoryServie.awaiCategories().subscribe(a => this.categories  = a);
   }

  ngOnInit() {
  }

}
