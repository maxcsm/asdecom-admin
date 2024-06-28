import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersColocPageRoutingModule } from './users-coloc-routing.module';

import { UsersColocPage } from './users-coloc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersColocPageRoutingModule
  ],
  declarations: [UsersColocPage]
})
export class UsersColocPageModule {}
