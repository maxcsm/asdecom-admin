import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditEventplanningPage } from './edit-eventplanning.page';

const routes: Routes = [
  {
    path: '',
    component: EditEventplanningPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditEventplanningPage]
})
export class EditEventplanningPageModule {}
