import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../storage/category';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
    categories_data;
    groupByFilter = 'Type';
    constructor(private categoriesService: CategoryService) { }

    ngOnInit() {
        this.categoriesService.loadAll().then((categories) => {
            this.categories_data = categories;
            console.log(categories);
            
        });
    }

}
