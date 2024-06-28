import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganisationPageRoutingModule } from './organisation-routing.module';

import { OrganisationPage } from './organisation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganisationPageRoutingModule
  ],
  declarations: [OrganisationPage]
})
export class OrganisationPageModule {}
