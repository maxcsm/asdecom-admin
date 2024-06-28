import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandeDevisPageRoutingModule } from './demande-devis-routing.module';

import { DemandeDevisPage } from './demande-devis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandeDevisPageRoutingModule
  ],
  declarations: [DemandeDevisPage]
})
export class DemandeDevisPageModule {}
