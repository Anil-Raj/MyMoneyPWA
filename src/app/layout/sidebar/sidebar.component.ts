import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

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
  { path: 'sign-in', title: 'Sign In', icon: 'account_circle', class: '' },
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
  closeSidebar() {
    this.nav.hide();
  }

}
