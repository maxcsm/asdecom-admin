import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'menu-home',
        loadChildren: () => import('../menu-home/menu-home.module').then(m => m.MenuHomePageModule)
      },
      {
        path: 'agenda',
        loadChildren: () => import('../agenda/agenda.module').then(m => m.AgendaPageModule)
      },
      {
        path: 'ateliers',
        loadChildren: () => import('../ateliers/ateliers.module').then(m => m.AteliersPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../messages/messages.module').then(m => m.MessagesPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: 'groupe',
        loadChildren: () => import('../groupe/groupe.module').then(m => m.GroupePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/menu-home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/menu-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
