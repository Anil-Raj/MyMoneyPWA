import { Component, OnInit } from '@angular/core';
import { PouchDBService } from '../../transaction/services/pouchdb.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {

categories_data ;
groupByFilter = 'Type';
  constructor(private database: PouchDBService) { }

  ngOnInit() {
    // this.database.isCategoriesModified.subscribe(() => {
        this.database.get_cat().subscribe((categories) => {
            console.log(categories);

            this.categories_data = categories.rows.map(row => {

                return row.doc;
            });
            console.log(this.categories_data);
        });
    // });
  }

}
