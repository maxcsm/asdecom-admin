import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalNoteAtelierPageRoutingModule } from './modal-note-atelier-routing.module';

import { ModalNoteAtelierPage } from './modal-note-atelier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalNoteAtelierPageRoutingModule
  ],
  declarations: [ModalNoteAtelierPage]
})
export class ModalNoteAtelierPageModule {}
