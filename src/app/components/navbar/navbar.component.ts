import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    constructor(public nav: SidebarService) { }
    navOpen() {
        this.nav.show();
    }
    groupByTransaction() {
        this.nav.confirmMission('time');
    }
    groupByCategory() {
        this.nav.confirmMission('categoryId');
    }
}
