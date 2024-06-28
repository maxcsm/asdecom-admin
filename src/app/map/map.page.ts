import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';


import * as Leaflet from 'leaflet';
import { RedditService } from 'src/providers/reddit-service';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {

  map!: Leaflet.Map;
  role:any="";
  pages: any;
  items: any;
  posts: any;
  page:number;
  table: string="users";
  table2: string="locationsmap";
  table3: string="appointements";
  status:any="";
  category:any=2;
  filter:string="";
  per_page:number=100;
  order_id:any="id";
  order_by:any="desc";
  locationappointement: any;
  totaltech: any;
  totalappointemnts: any;

  lngevnt: any;
  techs: any;
  postsevents: any;
  eventid: any;
  appointement: any;
  technicienId: any;


  constructor
  ( 
    private formBuilder: FormBuilder, 
    public alertController: AlertController, 
    public redditService:RedditService, 
    private router: Router,  
    private loadingCtrl: LoadingController ) {
    this.page=1;
  }

  async ngOnInit() { 

    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });



    this.redditService.getDataBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
      console.log(data);
      loading.dismiss();
      this.posts=data.data;
      this.totaltech=data.total;
      console.log(this.totaltech); 
      this.leafletMap();
      })

      this.redditService.getDataAll(this.table2).subscribe(data => {
      this.locationappointement=data.location;

      console.log(this.locationappointement); 
      this.totalappointemnts=data.location.length;
      });  

    
  }




  leafletMap() {
    this.map = new Leaflet.Map('mapId2').setView([46.2043907, 6.1431577], 9);
    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);


    for (let i = 0; i < this.totaltech; i++) {
      let item = this.posts[i];
      this.addmarker(item);   
      }
 


    
    for (let i = 0; i < this.totalappointemnts; i++) {
      let item = this.locationappointement[i];
      this.addmarker2(item);   
      }
    

  


  }

  ngOnDestroy() {
    this.map.remove();
  }

  addmarker(item: any) {


    var startIcon = Leaflet.icon({
      iconUrl: './assets/icon/marker-icon.png',
      iconAnchor:   [2, 32] 
    });

   
    const markPoint = Leaflet.marker([item.lat, item.lng],{icon: startIcon});
    markPoint.bindPopup('<p>'+item.firstname+" "+item.lastname+'</p>');
    this.map.addLayer(markPoint);
  }

  addmarker2(value: any) {
    var startIcon = Leaflet.icon({
      iconUrl: './assets/icon/marker-icon-2.png',
      iconAnchor:   [2, 10] 
    });
    console.log(value);
    const markPoint = Leaflet.marker([value.lat, value.lng],{icon: startIcon});



     markPoint.bindPopup(
     '<p>'+value.title+'</p>'+
     '<p>'+value.company+'</p>'+
     '<p>'+value.start_at+'</p>');

    this.eventid =value.item ; 
    this.getdataByid(); 
   this.map.addLayer(markPoint);
  }



  async getdataByid() {

    console.log("detail event");
    this.redditService.getByid(this.table, this.eventid).subscribe(data=>{
        this.postsevents = data.users;
        console.log(this.postsevents); 
        this.techs = data.techs;
        this.appointement = [data.appointement]; 
        this.lngevnt  =  this.techs.lenght; 
    })
   }
  



onChangeType(event: any){
  this.technicienId=event.target.value;
}

async  doUpdateAppointement() {
  var data = JSON.stringify({
    edited_by:this.technicienId,
    state:2
  }); 
  const alert = await this.alertController.create({
    header: 'Enregistrement',
    message: 'Voulez-vous vraiment ? ',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Oui',
        handler: () => { 
     
       
      
      this.redditService.update(this.table,this.eventid,data) 
      .toPromise()
      .then((response) =>

      {
        setTimeout(() => { 
          this.getdataByid();
       }, 400); 
      
      })}}]
    });
    await alert.present();

 }


 async doFinishedAppointement() {
  var data = JSON.stringify({
    state:3
  }); 
  const alert = await this.alertController.create({
    header: 'Enregistrement',
    message: 'Voulez-vous vraiment ? ',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Oui',
        handler: () => { 
     
      this.redditService.update(this.table,this.eventid,data) 
      .toPromise()
      .then((response) =>

      {
        setTimeout(() => { 
       
          this.getdataByid();
       }, 1000); 
      
      })}}]
    });
    await alert.present();

 }

}
