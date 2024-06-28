import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateEventplanningPage } from './create-eventplanning.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEventplanningPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateEventplanningPage]
})
export class CreateEventplanningPageModule {}
