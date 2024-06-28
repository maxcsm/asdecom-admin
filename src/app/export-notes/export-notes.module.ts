import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportNotesPageRoutingModule } from './export-notes-routing.module';

import { ExportNotesPage } from './export-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportNotesPageRoutingModule
  ],
  declarations: [ExportNotesPage]
})
export class ExportNotesPageModule {}
