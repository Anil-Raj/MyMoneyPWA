import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../../Models/Category';
import { PouchDBService } from '../../../services/pouchdb.service';
import { Router } from '@angular/router';
import { Animations } from '../../../animations/animations';


@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styleUrls: ['./category-add.component.css'],
    animations: [Animations.slideUp],
})
export class CategoryAddComponent implements OnInit, OnDestroy {
    isSaveCalled = false;
    private category: Category = null;
    addCategoryForm: FormGroup;
    constructor(private database: PouchDBService, private router: Router, private location: Location, private meta: Meta) {

    }

    ngOnInit() {
        const metaDef: MetaDefinition = { name: 'theme-color', content: 'white' };
        this.meta.updateTag(metaDef);
        this.addCategoryForm = new FormGroup({
            Icon: new FormControl('', Validators.required),
            Note: new FormControl(),
            Name: new FormControl('', Validators.required),
            Type: new FormControl('Income'),

        });
    }
    ngOnDestroy() {
        const metaDef: MetaDefinition = { name: 'theme-color', content: '#673ab7' };
        this.meta.updateTag(metaDef);
    }
    onSubmit({ valid, value }: { valid: boolean, value: any }) {
        if (valid) {
            // value.id = 'category_' + value.Type.toLowerCase() + '_' + new Date().valueOf();
            const cat = new Category();
            let c: any;
            c = cat.fromForm(value);
            // const category = value;
            // category.id = 'category_' + value.Type.toLowerCase() + '_' + new Date().valueOf();
            console.log(c);
            this.database.put_cat('transaction_' + new Date().valueOf(), c).then(() => {
                // this.database.put_cat(c).then(() => {
                this.router.navigate(['/category/']);
            });
        }
    }
    back() {
        this.location.back();
    }
}
