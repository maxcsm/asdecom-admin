import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanSallesPageRoutingModule } from './plan-salles-routing.module';

import { PlanSallesPage } from './plan-salles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanSallesPageRoutingModule
  ],
  declarations: [PlanSallesPage]
})
export class PlanSallesPageModule {}
