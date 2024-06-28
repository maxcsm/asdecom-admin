import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportUsersPageRoutingModule } from './export-users-routing.module';

import { ExportUsersPage } from './export-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportUsersPageRoutingModule
  ],
  declarations: [ExportUsersPage]
})
export class ExportUsersPageModule {}
