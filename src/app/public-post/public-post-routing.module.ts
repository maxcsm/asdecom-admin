import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicPostPage } from './public-post.page';

const routes: Routes = [
  {
    path: '',
    component: PublicPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPostPageRoutingModule {}
