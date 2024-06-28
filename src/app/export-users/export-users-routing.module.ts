import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportUsersPage } from './export-users.page';

const routes: Routes = [
  {
    path: '',
    component: ExportUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportUsersPageRoutingModule {}
