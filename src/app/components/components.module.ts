import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from './sidebar/sidebar.service';
import { MatButtonModule, MatListModule, MatToolbarModule, MatMenuModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule, MatListModule, MatToolbarModule, MatMenuModule, MatIconModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  providers: [SidebarService]
})
export class ComponentsModule { }
