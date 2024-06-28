import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AteliersPage } from './ateliers.page';

const routes: Routes = [
  {
    path: '',
    component: AteliersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AteliersPageRoutingModule {}
