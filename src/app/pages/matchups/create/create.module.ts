import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CreatePage } from './create.page';
import { CreatePageRoutingModule } from './create-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRoutingModule, 
  ],
  declarations: [CreatePage]
})
export class CreatePageModule {}
