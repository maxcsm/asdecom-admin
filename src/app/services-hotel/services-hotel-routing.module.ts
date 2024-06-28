import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesHotelPage } from './services-hotel.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesHotelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesHotelPageRoutingModule {}
