import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryService } from './category.service';
import { CategorySelectComponent } from './category-select/category-select.component';
import { CatSelInputComponent } from './cat-sel-input/cat-sel-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatRadioModule, MatListModule, MatToolbarModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { GroupByModule } from '../../pipes/group-by.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatRadioModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    GroupByModule
  ],
  declarations: [
    CategoryAddComponent,
    CategoryDetailComponent,
    CategoryEditComponent,
    CategoryListComponent,
    CategorySelectComponent,
    CatSelInputComponent
  ],
  exports: [
    CategoryAddComponent,
    CategoryDetailComponent,
    CategoryEditComponent,
    CategoryListComponent,
    CategorySelectComponent,
    CatSelInputComponent
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
