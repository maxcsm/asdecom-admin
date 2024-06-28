import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PratiquePageRoutingModule } from './pratique-routing.module';

import { PratiquePage } from './pratique.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PratiquePageRoutingModule
  ],
  declarations: [PratiquePage]
})
export class PratiquePageModule {}
