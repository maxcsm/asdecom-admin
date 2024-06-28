import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagenewPage } from './messagenew.page';

const routes: Routes = [
  {
    path: '',
    component: MessagenewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagenewPageRoutingModule {}
