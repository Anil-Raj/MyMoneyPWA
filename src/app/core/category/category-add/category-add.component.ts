import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../../Models/Category';
import { PouchDBService } from '../../transaction/services/pouchdb.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {


    private transaction: Category = null;

    addCategoryForm: FormGroup;

    constructor(private database: PouchDBService, private router: Router) { }

    ngOnInit() {
        this.addCategoryForm = new FormGroup({
            Description: new FormControl(),
            Name: new FormControl('', Validators.required),
            Type: new FormControl(),

        });
    }
    onSubmit({ value }: { value: any }) {

        const transaction = <Category>value;
        console.log(transaction);
        this.database.put('category_' + new Date().valueOf(), transaction);
        this.router.navigate(['/category']);
    }
}
