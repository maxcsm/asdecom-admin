import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtelierDetailPage } from './atelier-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AtelierDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtelierDetailPageRoutingModule {}
