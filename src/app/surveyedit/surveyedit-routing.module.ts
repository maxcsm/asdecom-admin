import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyeditPage } from './surveyedit.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyeditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyeditPageRoutingModule {}
