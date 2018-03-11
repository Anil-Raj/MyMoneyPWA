import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../Models/Category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PouchDBService } from '../../transaction/services/pouchdb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit, OnDestroy {


    id;
    category: any;

    addCategoryForm: FormGroup;

    constructor(private database: PouchDBService, private router: Router, private route: ActivatedRoute,
        private location: Location, private meta: Meta) { }

    ngOnInit() {
        const metaDef: MetaDefinition = { name: 'theme-color', content: 'white' };
        this.meta.updateTag(metaDef);
        this.getCategory();
        this.addCategoryForm = new FormGroup({
            Icon: new FormControl(),
            Description: new FormControl(),
            Name: new FormControl('', Validators.required),
            Type: new FormControl(),

        });
    }
    ngOnDestroy(): void {
        const metaDef: MetaDefinition = { name: 'theme-color', content: '#673ab7' };
        this.meta.updateTag(metaDef);
    }
    getCategory() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.database.getDoc(this.id).subscribe((categories) => {
            this.category = categories.rows.map(row => {
                return row.doc;
            });
            this.addCategoryForm.patchValue({
                Icon: this.category[0].Icon,
                Description: this.category[0].Description,
                Name: this.category[0].Name,
                Type: this.category[0].Type
            });

        });
    }
    onSubmit({ valid, value }: { valid: any, value: any }) {
        if (valid) {
            const transaction = value;
            console.log(transaction);
            this.database.put(this.id, transaction).then(() => {
                this.router.navigate(['/category/']);
            });
        }
    }
    back() {
        this.location.back();
    }

}
