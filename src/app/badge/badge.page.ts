import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/providers/local.service';
import * as JsBarcode from 'jsbarcode';



@Component({
  selector: 'app-badge',
  templateUrl: './badge.page.html',
  styleUrls: ['./badge.page.scss'],
})
export class BadgePage implements OnInit {


  @ViewChild(IonModal)
  modal!: IonModal;

  posts: any;
  title: any;
  price: any;
  content: any;
  url: any;
  image: any;
  id: any;
  table: string="GetAtelierWithNote";
  file: any;
  products: any;
  iduser: any;
  idproduct: any;
  idatelier: any;
  notationatelier: any;
  idcode: any;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private localStore: LocalService) {

   }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.idcode= params['id']; 
     });

     JsBarcode("#ean-8", this.idcode);


   }

   ionViewWillEnter(){


   }


 

  
}