import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersMenuPage } from './users-menu.page';

const routes: Routes = [
  {
    path: '',
    component: UsersMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersMenuPageRoutingModule {}
