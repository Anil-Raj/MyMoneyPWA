import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryService } from './category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GroupByModule } from '../../pipes/group-by.module';
import { CategoryInputComponent } from './cat-input/cat-input.component';
import { CategoryIconInputComponent } from './category-icon-input/category-icon-input.component';
import {
    MatInputModule,
    MatRadioModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatGridListModule } from '@angular/material';
import { CategoryItemComponent } from './category-item/category-item.component';

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
        MatGridListModule,
        GroupByModule
    ],
    declarations: [
        CategoryAddComponent,
        CategoryDetailComponent,
        CategoryEditComponent,
        CategoryListComponent,
        CategoryInputComponent,
        CategoryIconInputComponent,
        CategoryItemComponent
    ],
    exports: [
        CategoryAddComponent,
        CategoryDetailComponent,
        CategoryEditComponent,
        CategoryListComponent,
        CategoryInputComponent,
        CategoryIconInputComponent,
        CategoryItemComponent
    ],
    providers: [
        CategoryService
    ]
})
export class CategoryModule { }
