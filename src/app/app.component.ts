import { Component } from '@angular/core';
import { Transaction } from './Models/Transaction';
import { AccountService } from './storage/accounts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private accountService: AccountService,
    private route: Router
  ) {
    this.accountService.loadAll().then(accounts => {
      if (accounts.length == 0) {
        this.route.navigate(['/welcome'])
      }

    })
  }
}                                                                                     
