import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SidebarService, GroupBy } from '../sidebar/sidebar.service';
import { PouchDBService } from '../../core/transaction/services/pouchdb.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    gb = GroupBy;
    viewByFilter;


    constructor(public nav: SidebarService,
        private navService: SidebarService,
        private database: PouchDBService,
        private router: Router) {
        this.navService.viewBy.subscribe(a => this.viewByFilter = a.range);
        console.log(this.viewByFilter);
    }

    navOpen() {
        this.nav.show();
    }
    groupByTransaction() {
        this.nav.confirmGroupBy('time');
    }
    groupByCategory() {
        this.nav.confirmGroupBy('categoryId');
    }
    groupByMonth() {
        this.nav.confirmViewBy('month');
    }
    groupByDay() {
        this.nav.confirmViewBy('day');
    }
    groupByWeek() {
        this.nav.confirmViewBy('week');
    }
    sync() {
        if (localStorage.getItem('user') === null) {
            this.router.navigate(['/sign-in/']);
        } else {
            localStorage.getItem('user');
            this.database.sync('');
        }

    }
}
