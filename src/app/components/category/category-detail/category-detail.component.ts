import { Component, OnInit, OnDestroy, trigger, style, transition, state, animate } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PouchDBService } from '../../../services/pouchdb.service';
import { Location } from '@angular/common';
import { MetaDefinition, Meta } from '@angular/platform-browser';
import { CategoryService } from '../../../storage/category';

@Component({
    selector: 'app-category-detail',
    templateUrl: './category-detail.component.html',
    styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
    id;
    category;
    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private meta: Meta) { }

    ngOnInit() {

        const metaDef: MetaDefinition = { name: 'theme-color', content: 'white' };
        this.meta.updateTag(metaDef);
        this.id = this.route.snapshot.paramMap.get('id');
        console.log(this.id);
        this.categoryService.load(this.id).then((category) => {
            this.category = category[0];
            console.log(this.category);
            

        });
    }
    back() {
        this.location.back();
    }
    ngOnDestroy(): void {
        const metaDef: MetaDefinition = { name: 'theme-color', content: '#673ab7' };
        this.meta.updateTag(metaDef);
    }
    del(tr) {
        this.categoryService.remove(tr.id).then((a) => {
            console.log(a);
            this.router.navigate(['/category/']);
        });
    }

}
