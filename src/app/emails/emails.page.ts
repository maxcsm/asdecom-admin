import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController, InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.page.html',
  styleUrls: ['./emails.page.scss'],
})
export class EmailsPage implements OnInit {


  @ViewChild(IonModal)
  modal!: IonModal;
  rolename: string="client";
  role:any=1;

  pages: any;
  items: any;
  posts: any;
  page:number;


  table1: string="appointementonemonth";
  table2: string="appointementtowmonth";
  table3: string="allinvoicesclose";
  

  posts1: any;
  posts2: any;
  posts3: any;



  

  constructor
  ( public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController, 
    public menu: MenuController,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController ) {
    this.page=1;}



  ngOnInit(): void {
 
  }

  async getEmail1(){
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;
        this.redditService.getDataAll(this.table1).subscribe(data => {
        console.log(data.nbemails);
        loading.dismiss();
        this.posts1=data.nbemails;
        })
     }  
  
     async getEmail2(){
      //  this.simpleLoader();
      const loading = await this.loadingCtrl.create({
        message: 'Chargement..',
        spinner: 'bubbles',
      });
      await loading.present();
          this.page=1;
          this.redditService.getDataAll(this.table2).subscribe(data => {
          console.log(data.nbemails);
          loading.dismiss();
          this.posts2=data.nbemails;
          })
       }  

       async getEmail3(){
        //  this.simpleLoader();
        const loading = await this.loadingCtrl.create({
          message: 'Chargement..',
          spinner: 'bubbles',
        });
        await loading.present();
            this.page=1;
            this.redditService.getDataAll(this.table3).subscribe(data => {
            console.log(data);
            console.log(data.nbemails);
            loading.dismiss();
            this.posts3=data.nbemails;
            })
         }  

  
 }
  
  