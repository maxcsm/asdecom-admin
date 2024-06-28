import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointementsPage } from './appointements.page';

const routes: Routes = [
  {
    path: '',
    component: AppointementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointementsPageRoutingModule {}
