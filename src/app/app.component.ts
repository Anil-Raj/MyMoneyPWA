import { Component } from '@angular/core';
import { Transaction } from './Models/Transaction';
import { AccountService } from './storage/accounts';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
    this.accountService.loadAll().then(accounts => {
      if (accounts.length === 0) {
        this.router.navigate(['/welcome']);
      }

    });
  }
}
