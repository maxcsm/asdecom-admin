import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaDetailPage } from './agenda-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AgendaDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaDetailPageRoutingModule {}
