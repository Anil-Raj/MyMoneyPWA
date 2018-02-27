import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryService } from './category.service';
import { CategorySelectComponent } from './category-select/category-select.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CategoryAddComponent,
    CategoryDetailComponent,
    CategoryEditComponent,
    CategoryListComponent,
    CategorySelectComponent
  ],
  exports: [
    CategoryAddComponent,
    CategoryDetailComponent,
    CategoryEditComponent,
    CategoryListComponent,
    CategorySelectComponent
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
