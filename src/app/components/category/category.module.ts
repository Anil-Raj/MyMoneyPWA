import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CategoryInputComponent } from './cat-input/cat-input.component';
import {
    MatInputModule,
    MatRadioModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatGridListModule } from '@angular/material';
import { CategoryItemComponent } from './category-item/category-item.component';
import { InputModule } from '../input/input.module';
import { CustomPipeModule } from '../../pipes/custom-pipe.module';
import { MaterialModules } from '../../core-module/material-modules';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserAnimationsModule,
        MaterialModules,
        CustomPipeModule,
        InputModule
    ],
    declarations: [
        CategoryAddComponent,
        CategoryDetailComponent,
        CategoryEditComponent,
        CategoryListComponent,
        CategoryInputComponent,
        CategoryItemComponent
    ],
    exports: [
        CategoryAddComponent,
        CategoryDetailComponent,
        CategoryEditComponent,
        CategoryListComponent,
        CategoryInputComponent,
        CategoryItemComponent
    ]
})
export class CategoryModule { }
