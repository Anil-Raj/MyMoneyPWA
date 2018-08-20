import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Animations } from '../../../animations/animations';
import { CategoryService } from '../../../storage/category';
import { Category } from '../../../Models/Category';


@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styleUrls: ['./category-add.component.css'],
    animations: [Animations.slideUp],
})
export class CategoryAddComponent implements OnInit, OnDestroy {
    addCategoryForm: FormGroup;
    constructor(private categoriesService: CategoryService, private router: Router, private location: Location, private meta: Meta) {

    }

    ngOnInit() {
        const metaDef: MetaDefinition = { name: 'theme-color', content: 'white' };
        this.meta.updateTag(metaDef);
        this.addCategoryForm = new FormGroup({
            Icon: new FormControl('', Validators.required),
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
            this.categoriesService.save(Category.fromForm(value)).then(() => {
                this.router.navigate(['/category/']);
            });
        }
    }
    back() {
        this.location.back();
    }
}
