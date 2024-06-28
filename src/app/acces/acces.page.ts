import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import * as Leaflet from 'leaflet';
@Component({
  selector: 'app-acces',
  templateUrl: './acces.page.html',
  styleUrls: ['./acces.page.scss'],
})
export class AccesPage implements OnInit {

  posts: any;
  title: any;
  price: any;
  content: any;
  url: any;
  image: any;
  id: any;

  file: any;
  gallery: any;
  idgallery: any;

  public editorValue: string = '';


  UrlBase: string="";
  UrlImage: string="";
  subtitle: any;
  view: any;
 
  table: string="locations";
  category:any="";
  pages: any;
  items: any;
  status:any="";
  filter:string="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=6;
  order_id:any="id";
  order_by:any="asc";
  currentpage!: number;
  page!: number;
  map!: Leaflet.Map;
  lat: any;
  lng: any;
  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    public sanitizer: DomSanitizer,
    private loadingCtrl: LoadingController) {

   }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.id=params['id']; 
      this.getData(); 
    //  this.galleryByPost();
      this.UrlImage=this.redditService.getUrlImage();
     });
   }

  
   async getData(){
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;
        this.redditService.getDataBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
        loading.dismiss();
          this.posts=data.data;
          this.total=data.total;
          this.per_page=data.per_page;
          this.currentpage=data.current_page;    
          this.last_page=data.last_page;   

          this.lat=this.posts[0].lat;
          this.lng=this.posts[0].lng;
          this.leafletMap();
        })
  }  
   
   leafletMap() {
    this.map = new Leaflet.Map('mapId2').setView([ this.lat,  this.lng], 12);
    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);
   this.addmarker(); 
  }


  addmarker() {
    var startIcon = Leaflet.icon({
      iconUrl: './assets/icon/marker-icon.png',
      iconAnchor:   [2, 32] 
    });
    const markPoint = Leaflet.marker([this.lat, this.lng],{icon: startIcon});
    this.map.addLayer(markPoint);
  }

 
  ngOnDestroy() {
    this.map.remove();
  }

}