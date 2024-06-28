import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemandeDevisPage } from './demande-devis.page';

const routes: Routes = [
  {
    path: '',
    component: DemandeDevisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandeDevisPageRoutingModule {}
