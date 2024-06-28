import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSignaturePageRoutingModule } from './modal-signature-routing.module';

import { ModalSignaturePage } from './modal-signature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSignaturePageRoutingModule
  ],
  declarations: [ModalSignaturePage]
})
export class ModalSignaturePageModule {}
