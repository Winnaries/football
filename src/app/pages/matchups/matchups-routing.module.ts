import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchupsPage } from './matchups.page';

const routes: Routes = [
  {
    path: '',
    component: MatchupsPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchupsPageRoutingModule {}
