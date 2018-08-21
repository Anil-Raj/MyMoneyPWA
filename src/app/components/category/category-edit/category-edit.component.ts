import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { CategoryService } from '../../../storage/category';
import { Category } from '../../../Models/Category';
import { Animations } from '../../../animations/animations';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.css'],
    animations:[Animations.slideUp]
})
export class CategoryEditComponent implements OnInit, OnDestroy {

    addCategoryForm: FormGroup;
    category: any;
    constructor(private categoriesService: CategoryService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private meta: Meta) { }

    ngOnInit() {
        const metaDef: MetaDefinition = { name: 'theme-color', content: 'white' };
        this.meta.updateTag(metaDef);
        this.getCategory();
        this.addCategoryForm = new FormGroup({
            Icon: new FormControl(),
            Note: new FormControl(),
            Name: new FormControl('', Validators.required),
            Type: new FormControl(),

        });
    }
    ngOnDestroy(): void {
        const metaDef: MetaDefinition = { name: 'theme-color', content: '#673ab7' };
        this.meta.updateTag(metaDef);
    }
    getCategory() {
        const id = this.route.snapshot.paramMap.get('id');
        this.categoriesService.load(id).then((category) => {
            this.category = Category.fromStorage(category);
            this.addCategoryForm.patchValue({
                Icon: category.Icon,
                Name: category.Name,
                Type: category.Type
            });
        });
    }
    onSubmit({ valid, value }: { valid: any, value: any }) {
        if (valid) {
            
            const category = { ...Category.toStorage(this.category), ...value };
            this.categoriesService.save(category).then(() => {
                this.router.navigate(['/category/']);
            });
        }
    }
    back() {
        this.location.back();
    }

}
