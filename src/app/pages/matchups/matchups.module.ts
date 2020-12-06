import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchupsPageRoutingModule } from './matchups-routing.module';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { MatchupsPage } from './matchups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule, 
    MatchupsPageRoutingModule
  ],
  declarations: [MatchupsPage]
})
export class MatchupsPageModule {}
