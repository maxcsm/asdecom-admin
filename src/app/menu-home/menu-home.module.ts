import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuHomePageRoutingModule } from './menu-home-routing.module';

import { MenuHomePage } from './menu-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuHomePageRoutingModule
  ],
  declarations: [MenuHomePage]
})
export class MenuHomePageModule {}
