import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../providers/authentication.service';
import { LocalService } from 'src/providers/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {

  email: any;
  password: any;
  token: any;

  public onLoginForm!: FormGroup;
  roleUser: any;
  page!: number;
  table!: string;
  per_page!: number;
  order_id!: string;
  category!: string;
  order_by!: string;
  status!: string;
  filter!: string;
  products: any;
  session: any;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public LoadingController: LoadingController,
    public formBuilder: FormBuilder,
    public redditService:RedditService,
    private router: Router,
    public alertController: AlertController,
    private storage: Storage,
    private authService: AuthenticationService,
    private localStore: LocalService,

  ) { }

  ionViewWillEnter() {
   this.menu.enable(false);
  }

  ngOnInit() {
    this.email = this.localStore.getItem('email');
    this.password = this.localStore.getItem('password');

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }


  async goLogin() {
    const loader = await this.LoadingController.create({
    message: 'Connexion en cours',
    });
    loader.present();
    var data = JSON.stringify({ 
    email:this.email,
    password: this.password,
    }); 
    
    this.redditService.login(data)
    .subscribe(async (response) => {
    setTimeout(() => { 
    loader.dismiss();
    }, 1300); 

  // this.authService.login(response);
  if(response[0].role==3 ){


    this.authService.ifLoggedIn(); 
    const toast = await this.toastCtrl.create({
      cssClass: 'bg-profile',
      message: 'Connexion réussie ',
      duration: 3000,
      position: 'bottom',

    });
    toast.present();

  
    this.roleUser=response[0].role;
    this.localStore.saveItem('session_id',response[0].session_id);
    this.localStore.saveItem('iduser',response[0].id);
    this.localStore.saveItem('category',response[0].category);
    this.localStore.saveItem('role',response[0].role);
    this.localStore.saveItem('email',this.email);
    this.localStore.saveItem('password',this.password);
    this.localStore.saveItem('token',response.token);


    this.redditService.getByid("sessions", response[0].session_id).subscribe(data=>{
      this.session = [data];
     // this.localStore.saveItem('session_image',[data][0].image);
      })
      
   if(this.roleUser==3){
    setTimeout(() => { 
      handler: async () => {}
      this.router.navigateByUrl('/home');
      this.getMenu();
      }, 2000); 
   }
  } else {
    this.presentAlertError();
  }
  },
       error => {    
       loader.dismiss();
      });
  }
 

  async goToRegister() {
    this.router.navigateByUrl('/register');
  }

  async forgotPass() {
    this.router.navigateByUrl('/forgotpassword');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erreur',
      subHeader: '',
      message: 'E-mail ou mot de passe incorrect',
      buttons: [{
        text: 'Ok',
        cssClass: 'primary',
        handler: (blah) => {
          console.log('Confirm Ok: blah');
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

  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Erreur',
      subHeader: '',
      message: 'Identifiant ou mot passe incorrect ',
      buttons: [{
        text: 'Ok',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Ok: blah');
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



  getMenu(){
    if(this.roleUser==3){
      this.menu.enable(true, 'menu3');
    }
  }




}
