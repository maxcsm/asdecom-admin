import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalQuestionPage } from './modal-question.page';

const routes: Routes = [
  {
    path: '',
    component: ModalQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalQuestionPageRoutingModule {}
