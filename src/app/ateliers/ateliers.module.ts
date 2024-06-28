import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AteliersPageRoutingModule } from './ateliers-routing.module';

import { AteliersPage } from './ateliers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AteliersPageRoutingModule
  ],
  declarations: [AteliersPage]
})
export class AteliersPageModule {}
