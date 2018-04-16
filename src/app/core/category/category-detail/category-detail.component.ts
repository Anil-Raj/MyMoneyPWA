import { Component, OnInit, OnDestroy, trigger, style, transition, state, animate } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PouchDBService } from '../../transaction/services/pouchdb.service';
import { Location } from '@angular/common';
import { MetaDefinition, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-category-detail',
    templateUrl: './category-detail.component.html',
    styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
    id;
    category;
    constructor(
        private database: PouchDBService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private meta: Meta) { }

    ngOnInit() {

        const metaDef: MetaDefinition = { name: 'theme-color', content: 'white' };
        this.meta.updateTag(metaDef);
        this.id = this.route.snapshot.paramMap.get('id');
        console.log(this.id);
        this.database.get_cat().subscribe((categories) => {
            this.category = categories.rows.map(row => {
                return row.doc;
            });
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
}
