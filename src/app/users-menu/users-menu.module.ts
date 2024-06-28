import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersMenuPageRoutingModule } from './users-menu-routing.module';

import { UsersMenuPage } from './users-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersMenuPageRoutingModule
  ],
  declarations: [UsersMenuPage]
})
export class UsersMenuPageModule {}
