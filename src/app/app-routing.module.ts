import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/providers/auth-guard.service';

const routes: Routes = [
 /* {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },*/

  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule),

  },
  {
    path: 'techs',
    loadChildren: () => import('./techs/techs.module').then( m => m.TechsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account/:id',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule),

  },
  {
    path: 'invoices',
    loadChildren: () => import('./invoices/invoices.module').then( m => m.InvoicesPageModule),

  },
  {
    path: 'quotes',
    loadChildren: () => import('./quotes/quotes.module').then( m => m.QuotesPageModule),

  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule),

  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'form1/:id',
    loadChildren: () => import('./form1/form1.module').then( m => m.Form1PageModule),
  },
  {
    path: 'invoice/:id',
    loadChildren: () => import('./invoice/invoice.module').then( m => m.InvoicePageModule),

  },
  {
    path: 'appointements',
    loadChildren: () => import('./appointements/appointements.module').then( m => m.AppointementsPageModule),

  },
  {
    path: 'profil/:id',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'form2/:id/:idclient',
    loadChildren: () => import('./form2/form2.module').then( m => m.Form2PageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'quote/:id',
    loadChildren: () => import('./quote/quote.module').then( m => m.QuotePageModule)
  },
  {
    path: 'modal-signature',
    loadChildren: () => import('./modal-signature/modal-signature.module').then( m => m.ModalSignaturePageModule)
  },
  {
    path: 'form3/:id/:idclient',
    loadChildren: () => import('./form3/form3.module').then( m => m.Form3PageModule)
  },
  {
    path: 'emails',
    loadChildren: () => import('./emails/emails.module').then( m => m.EmailsPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule),

  },
  {
    path: 'product/:id',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule),
  },
  {
    path: 'return',
    loadChildren: () => import('./return/return.module').then( m => m.ReturnPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: 'appointement/:id',
    loadChildren: () => import('./appointement/appointement.module').then( m => m.AppointementPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then( m => m.PostsPageModule)
  },
  {
    path: 'post/:id',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'public-post/:id',
    loadChildren: () => import('./public-post/public-post.module').then( m => m.PublicPostPageModule)
  },
  {
    path: 'public-posts',
    loadChildren: () => import('./public-posts/public-posts.module').then( m => m.PublicPostsPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'service/:id',
    loadChildren: () => import('./service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'demande-devis',
    loadChildren: () => import('./public/demande-devis/demande-devis.module').then( m => m.DemandeDevisPageModule)
  },
  {
    path: 'solutions-developpement',
    loadChildren: () => import('./public/solutions-developpement/solutions-developpement.module').then( m => m.SolutionsDeveloppementPageModule)
  },
  {
    path: 'menu-home',
    loadChildren: () => import('./menu-home/menu-home.module').then( m => m.MenuHomePageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'agenda-detail',
    loadChildren: () => import('./agenda-detail/agenda-detail.module').then( m => m.AgendaDetailPageModule)
  },
  {
    path: 'ateliers',
    loadChildren: () => import('./ateliers/ateliers.module').then( m => m.AteliersPageModule)
  },
  {
    path: 'atelier-detail/:id',
    loadChildren: () => import('./atelier-detail/atelier-detail.module').then( m => m.AtelierDetailPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'groupe',
    loadChildren: () => import('./groupe/groupe.module').then( m => m.GroupePageModule)
  },
  {
    path: 'users-menu',
    loadChildren: () => import('./users-menu/users-menu.module').then( m => m.UsersMenuPageModule)
  },
  {
    path: 'user-detail/:id',
    loadChildren: () => import('./user-detail/user-detail.module').then( m => m.UserDetailPageModule)
  },
  {
    path: 'modal-note',
    loadChildren: () => import('./modal-note/modal-note.module').then( m => m.ModalNotePageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'message/:id',
    loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'messagenew/:id/:firstname/:lastname',
    loadChildren: () => import('./messagenew/messagenew.module').then( m => m.MessagenewPageModule)
  },
  {
    path: 'surveys',
    loadChildren: () => import('./surveys/surveys.module').then( m => m.SurveysPageModule)
  },
  {
    path: 'modal-note-atelier',
    loadChildren: () => import('./modal-note-atelier/modal-note-atelier.module').then( m => m.ModalNoteAtelierPageModule)
  },
  {
    path: 'plan-salles',
    loadChildren: () => import('./plan-salles/plan-salles.module').then( m => m.PlanSallesPageModule)
  },
  {
    path: 'badge/:id',
    loadChildren: () => import('./badge/badge.module').then( m => m.BadgePageModule)
  },
  {
    path: 'services-hotel',
    loadChildren: () => import('./services-hotel/services-hotel.module').then( m => m.ServicesHotelPageModule)
  },
  {
    path: 'acces',
    loadChildren: () => import('./acces/acces.module').then( m => m.AccesPageModule)
  },
  {
    path: 'organisation',
    loadChildren: () => import('./organisation/organisation.module').then( m => m.OrganisationPageModule)
  },
  {
    path: 'pratique',
    loadChildren: () => import('./pratique/pratique.module').then( m => m.PratiquePageModule)
  },
  {
    path: 'users-coloc',
    loadChildren: () => import('./users-coloc/users-coloc.module').then( m => m.UsersColocPageModule)
  },
  {
    path: 'sessions',
    loadChildren: () => import('./sessions/sessions.module').then( m => m.SessionsPageModule)
  },
  {
    path: 'session/:id',
    loadChildren: () => import('./session/session.module').then( m => m.SessionPageModule)
  },
  {
    path: 'locations',
    loadChildren: () => import('./locations/locations.module').then( m => m.LocationsPageModule)
  },
  {
    path: 'location/:id',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'survey/:id',
    loadChildren: () => import('./survey/survey.module').then( m => m.SurveyPageModule)
  },
  {
    path: 'modal-question',
    loadChildren: () => import('./modal-question/modal-question.module').then( m => m.ModalQuestionPageModule)
  },
  {
    path: 'surveyedit/:id',
    loadChildren: () => import('./surveyedit/surveyedit.module').then( m => m.SurveyeditPageModule)
  },
  {
    path: 'export-users',
    loadChildren: () => import('./export-users/export-users.module').then( m => m.ExportUsersPageModule)
  },
  {
    path: 'export-notes',
    loadChildren: () => import('./export-notes/export-notes.module').then( m => m.ExportNotesPageModule)
  },
  {
    path: 'fournisseurs',
    loadChildren: () => import('./fournisseurs/fournisseurs.module').then( m => m.FournisseursPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
