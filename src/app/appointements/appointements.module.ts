import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointementsPageRoutingModule } from './appointements-routing.module';

import { AppointementsPage } from './appointements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointementsPageRoutingModule
  ],
  declarations: [AppointementsPage]
})
export class AppointementsPageModule {}
