import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController, InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/providers/DataService';
import { co } from '@fullcalendar/core/internal-common';
import {format} from "date-fns";
@Component({
  selector: 'app-export-users',
  templateUrl: './export-users.page.html',
  styleUrls: ['./export-users.page.scss'],
})
export class ExportUsersPage implements OnInit {


  @ViewChild(IonModal)
  modal!: IonModal;
  rolename: string="client";
  role:any=1;



  id: any;
  pages: any;
  items: any;
  posts: any;
  page:number;
 
  status:any="1";
  category:any="";
  filter:string="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=1000;
  order_id:any="id";
  order_by:any="desc";
  email_verified_at: any;
  currentpage!: number;

  
  email: any;
  address: any;
  city: any;
  cp: any;
  phone: any;
  firstname: any;
  lastname: any;
  company: any;
  formgroup!: FormGroup;
  validations_form!: FormGroup;

  users!: any[];
  postsdatardv: any;
  dataexportuser: any;
  products: any;
  ateliers: any;
  

  constructor( public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController, 
    public menu: MenuController,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private data: DataService ) {
    this.page=1;
  }


ngOnInit() {
}

  



async exportToExcelUsers(){
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;
        this.redditService.getDataBypage(this.page,"exportusers",this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
        loading.dismiss();
        console.log(data); 
         this.users=data.users;
         this.data.exportToExcel(this.users, 'Utilisateurs');
        })
  }  
  async exportToExcelAteliers(){
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;
        this.redditService.getDataBypage(this.page,"exportatelier",this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
        loading.dismiss();
        console.log(data); 
         this.ateliers=data.ateliers;
         this.data.exportToExcel( this.ateliers, 'Ateliers');
        })
  }  
  

  async exportToExcelProduct(){
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;
        this.redditService.getDataBypage(this.page,"exportproduct",this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
        loading.dismiss();
        console.log(data); 
         this.products=data.products;
         this.data.exportToExcel(this.products, 'Produits');
        })
  }  
  

 }
  
  