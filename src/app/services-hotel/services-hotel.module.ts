import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesHotelPageRoutingModule } from './services-hotel-routing.module';

import { ServicesHotelPage } from './services-hotel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesHotelPageRoutingModule
  ],
  declarations: [ServicesHotelPage]
})
export class ServicesHotelPageModule {}
