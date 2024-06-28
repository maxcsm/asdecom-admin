import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanSallesPage } from './plan-salles.page';

const routes: Routes = [
  {
    path: '',
    component: PlanSallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanSallesPageRoutingModule {}
