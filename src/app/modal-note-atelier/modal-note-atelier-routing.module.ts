import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalNoteAtelierPage } from './modal-note-atelier.page';

const routes: Routes = [
  {
    path: '',
    component: ModalNoteAtelierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalNoteAtelierPageRoutingModule {}
