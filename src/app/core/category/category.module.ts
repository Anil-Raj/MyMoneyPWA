import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CategoryAddComponent,
    CategoryDetailComponent,
    CategoryEditComponent,
    CategoryListComponent
  ]
})
export class CategoryModule { }
