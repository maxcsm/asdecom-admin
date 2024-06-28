import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyeditPageRoutingModule } from './surveyedit-routing.module';

import { SurveyeditPage } from './surveyedit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyeditPageRoutingModule
  ],
  declarations: [SurveyeditPage]
})
export class SurveyeditPageModule {}
