import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolutionsDeveloppementPageRoutingModule } from './solutions-developpement-routing.module';

import { SolutionsDeveloppementPage } from './solutions-developpement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolutionsDeveloppementPageRoutingModule
  ],
  declarations: [SolutionsDeveloppementPage]
})
export class SolutionsDeveloppementPageModule {}
