import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    viewByFilter;
    groupByFilter;

    constructor(public navService: SidebarService,
        private router: Router) {
        this.navService.viewBy.subscribe(a => this.viewByFilter = a.range);
        this.navService.groupBy.subscribe(a => this.groupByFilter = a);
    }

    navOpen() {
        this.navService.show();
    }
    groupByTransaction() {
        this.navService.confirmGroupBy('time');
    }
    groupByCategory() {
        this.navService.confirmGroupBy('categoryId');
    }
    groupByMonth() {
        this.navService.confirmViewBy('month');
    }
    groupByDay() {
        this.navService.confirmViewBy('day');
    }
    groupByWeek() {
        this.navService.confirmViewBy('week');
    }
    sync() {
        // if (localStorage.getItem('user') === null) {
        //     this.router.navigate(['/sign-in/']);
        //      this.database.sync(localStorage.getItem('user'));

        // } else {
        //     this.database.sync(localStorage.getItem('user'));
        // }

    }
}
