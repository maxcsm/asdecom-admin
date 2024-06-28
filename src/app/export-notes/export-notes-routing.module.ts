import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportNotesPage } from './export-notes.page';

const routes: Routes = [
  {
    path: '',
    component: ExportNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportNotesPageRoutingModule {}
