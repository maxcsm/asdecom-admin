import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagenewPageRoutingModule } from './messagenew-routing.module';

import { MessagenewPage } from './messagenew.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagenewPageRoutingModule
  ],
  declarations: [MessagenewPage]
})
export class MessagenewPageModule {}
