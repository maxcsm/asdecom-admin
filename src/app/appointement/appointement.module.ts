import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointementPageRoutingModule } from './appointement-routing.module';

import { AppointementPage } from './appointement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointementPageRoutingModule
  ],
  declarations: [AppointementPage]
})
export class AppointementPageModule {}
