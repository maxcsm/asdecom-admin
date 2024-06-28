import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganisationPage } from './organisation.page';

const routes: Routes = [
  {
    path: '',
    component: OrganisationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganisationPageRoutingModule {}
