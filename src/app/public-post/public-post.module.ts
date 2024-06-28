import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicPostPageRoutingModule } from './public-post-routing.module';

import { PublicPostPage } from './public-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicPostPageRoutingModule
  ],
  declarations: [PublicPostPage]
})
export class PublicPostPageModule {}
