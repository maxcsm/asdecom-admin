import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/providers/authentication.service';

import { ReturnPage } from './return/return.page';
import { LoginPage } from './login/login.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appClient = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Profil', url: '/profil', icon: 'person' },
    { title: 'Trash', url: '/tabs', icon: 'trash' },
  //  { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  public appTech = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Clients', url: '/customers', icon: 'person' },
    { title: 'Planning', url: '/calendar', icon: 'calendar' },
    //{ title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    //{ title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    //{ title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Carte', url: '/map', icon: 'map' },
    { title: 'Profil', url: '/profil', icon: 'person' },
    //{ title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    //{ title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  public appAdmin = [
    { title: 'Home', url: '/home', icon: 'home' },
     //{ title: 'Profil', url: '/profil', icon: 'person' },
    { title: 'Utilisateurs', url: '/customers', icon: 'person' },
     //{ title: 'Techniciens', url: '/techs', icon: 'person' },
     //{ title: 'Administrateurs', url: '/users', icon: 'person' },
    { title: 'Posts', url: '/posts', icon: 'mail' },
  //  { title: 'Planning', url: '/calendar', icon: 'calendar' },
    //{ title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    //{ title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
  //  { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Carte', url: '/map', icon: 'map' },

  // { title: 'Emails', url: '/emails', icon: 'person' },
  //  { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //  { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];



  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Sessions', url: '/sessions', icon: 'calendar' },
    { title: 'Clients', url: '/customers', icon: 'people' },
    { title: 'Fournisseurs', url: '/fournisseurs', icon: 'people' },
    { title: 'Admins', url: '/admin', icon: 'people' },
     //{ title: 'Techniciens', url: '/techs', icon: 'person' },
     //{ title: 'Administrateurs', url: '/users', icon: 'person' },
    { title: 'Actualités', url: '/posts', icon: 'list' },
    { title: 'Pages', url: '/public-posts', icon: 'list' },
    { title: 'Lieux', url: '/locations', icon: 'map' },
    { title: 'Articles', url: '/services', icon: 'copy' },
    { title: 'Programmes', url: '/appointements', icon: 'calendar' },
    { title: 'Ateliers', url: '/ateliers', icon: 'calendar' },
    { title: 'Produits', url: '/products', icon: 'cart' },
    { title: 'Quizz', url: '/surveys', icon: 'pricetags' },
    { title: 'Centres', url: '/categories', icon: 'pricetags' },
    { title: 'Exportation', url: '/export-users', icon: 'pricetags' },
    //{ title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    //{ title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
  //  { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
  //  { title: 'Carte', url: '/map', icon: 'map' },
  //  { title: 'Mon entreprise', url: '/profil', icon: 'alert-circle' },
  // { title: 'Emails', url: '/emails', icon: 'person' },
  //  { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //  { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];



  public labels = ['Divers'];
  firstname: any;
  lastname: any;
  role: any;
  deeplinks: any;
  constructor(   
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private authenticationService: AuthenticationService,
    public menu: MenuController,
    private storage: Storage
  
) {
    this.initializeApp();
  }



  initializeApp() {


    this.menu.enable(false);
   // this.menu.enable(false, 'menu1');

    this.platform.ready().then(() => {
   this.router.navigate(['/login']);     
        
  //  this.router.navigate(['/public-posts']);     
     });

 // this.authenticationService.authState.subscribe(state => {
   // this.loginmenu=state;
   // console.log(this.loginmenu);
 //   });
  //  console.log("AuthGuard");
   // console.log( this.AuthGuard.canActivate());
 //    this.login= this.AuthGuard.canActivate()
      // this.setupDeeplinks();
      // this.splashScreen.hide();

      /*
      this.deeplinks.Router({
        '/login': LoginPage,
        '/return': ReturnPage
      }).subscribe((match: any) => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        console.log('Successfully matched route', match);
      }, (nomatch: any) => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
      });
      
*/

/*

       this.deeplinks
        .route({
          "/home": HomePage,
        })
        .subscribe(
          (match) => {
            // match.$route - the route we matched, which is the matched entry from the arguments to route()
            // match.$args - the args passed in the link
            // match.$link - the full link data
            console.log("Successfully matched route", match);
          },
          (nomatch) => {
            // nomatch.$link - the full link data
            console.error("Got a deeplink that didn't match", nomatch);
          }

          */

/*
  email: this.email,
        salutation: this.salutation,
        firstname: this.firstname,
        lastname: this.lastname,
        address: this.address,
        cp:this.cp,
        city: this.city,
        state: this.state,
        country: this.country,
        phone_mobile: this.phone_mobile,
        phone_number: this.phone_number,
        company: this.company,
        customer_type: this.customer_type,
        notes: this.notes,
  
        shipping_address: this.shipping_address,
        shipping_cp:this.shipping_cp,
        shipping_city: this.shipping_city,
        shipping_state: this.shipping_state,
        shipping_country: this.shipping_country,
        shipping_phone: this.shipping_phone,
        billing_phone: this.billing_phone,
        siret_number: this.siret_number,
        tva_number: this.tva_number,
        role:1,

        lat:this.lat, 
        lng:this.lng





        );*/
   // });
  }



  async logout() {


    const alert = await this.alertController.create({
      header: 'Déconnexion',
      subHeader: '',
      message: 'Voulez-vous vraiment déconnecter ?',
      buttons: [{
        text: 'Ok',
        cssClass: 'primary',
        handler: (blah) => {
          console.log('Confirm Ok: blah');
     
          this.authenticationService.logout();
           setTimeout(() => { 
       
           
          this.menu.enable(false);
           this.router.navigateByUrl('/login');
         }, 1000); 
        }
      },
      {
        text: 'Annuler',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }
    ]
    });

    await alert.present();
  }
}
