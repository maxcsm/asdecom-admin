import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicPostsPageRoutingModule } from './public-posts-routing.module';

import { PublicPostsPage } from './public-posts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicPostsPageRoutingModule
  ],
  declarations: [PublicPostsPage]
})
export class PublicPostsPageModule {}
