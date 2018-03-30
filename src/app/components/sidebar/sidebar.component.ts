import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'transaction', title: 'Transactions', icon: 'account_balance_wallet', class: '' },
  { path: 'debt', title: 'Debts', icon: 'dock', class: '' },
  { path: 'trend', title: 'Trends', icon: 'trending_up', class: '' },
  { path: 'category', title: 'Categories', icon: 'category', class: '' },
  { path: 'fitness', title: 'Fitness', icon: 'fitness_center', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor( public nav: SidebarService ) {}
  menuItems: any[];

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    // if ($(window).width() > 991) {
    //   return false;
    // }
    return false;
  }
  closeSidebar() {
    this.nav.hide();
  }

}
