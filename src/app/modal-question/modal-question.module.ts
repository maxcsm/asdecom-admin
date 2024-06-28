import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalQuestionPageRoutingModule } from './modal-question-routing.module';

import { ModalQuestionPage } from './modal-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalQuestionPageRoutingModule
  ],
  declarations: [ModalQuestionPage]
})
export class ModalQuestionPageModule {}
