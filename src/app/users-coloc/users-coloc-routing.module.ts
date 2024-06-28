import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersColocPage } from './users-coloc.page';

const routes: Routes = [
  {
    path: '',
    component: UsersColocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersColocPageRoutingModule {}
