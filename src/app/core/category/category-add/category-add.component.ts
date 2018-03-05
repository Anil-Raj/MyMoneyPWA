import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Category } from '../../../Models/Category';
import { PouchDBService } from '../../transaction/services/pouchdb.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {


    private transaction: Category = null;

    addCategoryForm: FormGroup;

    constructor( private database: PouchDBService) { }

    ngOnInit() {
      this.addCategoryForm = new FormGroup ({
        Description: new FormControl(),
        Name: new FormControl(),
        Type: new FormControl(),

    });
    }
    onSubmit({ value }: { value: any }) {

        const transaction = <Category>value;
        console.log(transaction);
        this.database.put('category_' + Date().toString(), transaction);
      }
}
