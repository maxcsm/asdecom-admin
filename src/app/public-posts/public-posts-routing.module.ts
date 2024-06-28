import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicPostsPage } from './public-posts.page';

const routes: Routes = [
  {
    path: '',
    component: PublicPostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPostsPageRoutingModule {}
