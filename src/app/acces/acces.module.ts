import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccesPageRoutingModule } from './acces-routing.module';

import { AccesPage } from './acces.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccesPageRoutingModule
  ],
  declarations: [AccesPage]
})
export class AccesPageModule {}
