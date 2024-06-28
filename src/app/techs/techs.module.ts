import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechsPageRoutingModule } from './techs-routing.module';

import { TechsPage } from './techs.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TechsPageRoutingModule
  ],
  declarations: [TechsPage]
})
export class TechsPageModule {}
