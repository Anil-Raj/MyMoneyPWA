import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SidebarService, GroupBy } from '../sidebar/sidebar.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    gb = GroupBy;
    viewByFilter;
    constructor(public nav: SidebarService, private navService: SidebarService) {
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
        this.nav.confirmViewBy( 'month' );
    }
    groupByDay() {
        this.nav.confirmViewBy( 'day' );
    }
    groupByWeek() {
        this.nav.confirmViewBy( 'week' );
    }
}
