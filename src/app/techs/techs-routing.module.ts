import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechsPage } from './techs.page';

const routes: Routes = [
  {
    path: '',
    component: TechsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechsPageRoutingModule {}
