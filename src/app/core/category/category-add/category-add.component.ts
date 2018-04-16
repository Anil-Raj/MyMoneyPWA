import { Component, OnInit, trigger, style, transition, state, animate, OnDestroy } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../../Models/Category';
import { PouchDBService } from '../../transaction/services/pouchdb.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styleUrls: ['./category-add.component.css'],
    animations: [
        trigger('slideUp', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
                style({ transform: 'translateY(100%)' }),
                animate('.3s ease-out')
            ]),
            transition('* => void', [
                animate(500, style({ transform: 'translateY(-100%)' }))
            ])
        ])
    ],
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
            const category = value;
            this.database.put('category_' + category.Type.toLowerCase() + '_' + new Date().valueOf(), category).then(() => {
                this.router.navigate(['/category/']);
            });
        }
    }
    back() {
        this.location.back();
    }
}
