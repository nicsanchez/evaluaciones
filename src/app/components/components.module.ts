import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LoadingComponent } from "./loading/loading.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    LoadingComponent
  ]
})
export class ComponentsModule {}