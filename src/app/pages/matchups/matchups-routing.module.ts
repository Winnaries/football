import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchupsPage } from './matchups.page';

const routes: Routes = [
  {
    path: '',
    component: MatchupsPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchupsPageRoutingModule {}
