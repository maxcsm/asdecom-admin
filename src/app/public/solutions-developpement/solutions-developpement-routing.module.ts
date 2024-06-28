import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolutionsDeveloppementPage } from './solutions-developpement.page';

const routes: Routes = [
  {
    path: '',
    component: SolutionsDeveloppementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolutionsDeveloppementPageRoutingModule {}
