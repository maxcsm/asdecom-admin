import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { runInThisContext } from 'vm';
import * as Leaflet from 'leaflet';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  map!: Leaflet.Map;
  @ViewChild(IonModal)
  modal!: IonModal;

  public editorValue: string = '';

  table: string="users";
  table3: string="appointements";
  table2: string="projects_byuser";
  table4: string="appointementByUser";
  table5: string="getlocation";
  table6: string="saveappointement";
  table7: string="invoices";
  table8: string="invoicesByUser";
  table9: string="quotes";
  table10: string="quotesByUser";
  view:boolean=true;
  push: boolean=false;
  data: any;
  posts: any;
  image:string="";
  title: string="";
  url: string="";
  urlrewiting: string="";
  meta: string="";
  keyword: string="";
  keywords: any;
  deadlineTask: any;
  postdata: any;
  events: any;
  priority: any;

  firstname: any;
  lastname: any;
  email: any;
  user: any;
  namebank: any;
  dombank: any;
  iban: any;
  rib: any;
  bic: any;
  profilid: any;
  profilId: any;
  edit:boolean=false;
  edit2:boolean=false;

  segType: string = 'info';
  indicatif : string = '+33';
  phone: any;
  address: any;
  number:any = '';
  complement: any;
  city: any;
  cp: any;
  complemement: any;
  postall: any;
 
  name: any;
  contactList: any;
  partnerId: any;
  phonenew: any;
  firstnamenew: any;
  lastnamenew: any;
  emailnew: any;
  editcontactId: any;
  statuscontactedit: any;
  emailcontactedit: any;
  lastnamecontactedit: any;
  firstnamecontactedit: any;
  statuspartenaire: boolean=false;
  daycreatedAt: any;
  formaddphonetocontact:  boolean=false;

  contactId: any;
  addphone: any;
  indicatifnew:  string = '+33';
  addindicatif: string = '+33';
  phoneId: any;
  phonenumbertype: string = 'MOBILE';
  addtypephone:string = 'MOBILE';
  phonenumbertypenew:string = 'MOBILE';
  clientId: any;
  siren: any;
  id: any;
  files: any;
  formgroup!: FormGroup;
  validations_form!: FormGroup;
  datestart= new Date().toISOString();
  content: string="";
  iduser: any;
  phone_mobile: any;
  phone_number: any;
  company: any;
  notes: any;
  country: any;
  state: any;
  salutation: any;
  customer_type: any;
  shipping_cp: any;
  shipping_address: any;
  shipping_city: any;
  shipping_state: any;
  shipping_country: any;
  shipping_phone: any;
  billing_phone: any;
  tva_number: any;
  siret_number: any;
  role: any;
  client: boolean=false;
  listappointements: any;
  lat: any;
  lng: any;
  userstech: any;
  iduserselected: any=null;
  listinvoices: any;
  listquotes: any;
  code: any;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController) {}

  ionViewWillEnter() {}

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.iduser= params['id']; 
      this.getdata(); 
      this.getAppointementsByUser();
      this.getInvoicesByUser();
      this.getQuotesByUser();
      this.getfiles();
     });
   }

     async getdata() {
      this.redditService.getByid(this.table, this.iduser).subscribe(data=>{
        console.log(data);
          this.posts = data;

          this.role= data[0].role;
          if(data[0].role==1){  this.client= true  }; 
          this.salutation= data[0].salutation;

          this.firstname = data[0].firstname;
          this.lastname = data[0].lastname;
          this.address = data[0].address;
          this.cp = data[0].cp;
          this.city = data[0].city;
          this.state = data[0].state;
          this.country= data[0].country;            
          this.phone_mobile = data[0].phone_mobile;
          this.phone_number = data[0].phone_number;
          this.company = data[0].company;
          this.customer_type = data[0].customer_type;
          this.notes = data[0].notes;

          this.shipping_address = data[0].shipping_address;
          this.shipping_cp = data[0].shipping_cp;
          this.shipping_city = data[0].shipping_city;
          this.shipping_state = data[0].shipping_state;
          this.shipping_country= data[0].shipping_country;            
          this.shipping_phone= data[0].shipping_phone;
          this.billing_phone = data[0].billing_phone;
          this.tva_number= data[0].tva_number;
          this.siret_number= data[0].siret_number;
          this.lat= data[0].lat;
          this.lng= data[0].lng;

       
          this.leafletMap(); 
        })
     }

     leafletMap() {
      var startIcon = Leaflet.icon({
        iconUrl: './assets/icon/marker-icon.png',
        iconAnchor:   [2, 32] 
      });
      this.map = new Leaflet.Map('mapId2').setView([this.lat, this.lng], 12);
      Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      }).addTo(this.map);
      const markPoint = Leaflet.marker([this.lat, this.lng],{icon: startIcon});
      this.map.addLayer(markPoint);
 
    }
  

     async getfiles() {
      this.redditService.getByid(this.table2, this.iduser).subscribe(data=>{
          this.files = data.files;
          console.log(this.files);
      })
     }

     async getAppointementsByUser() {
      this.redditService.getByid(this.table4, this.iduser).subscribe(data=>{
          this.listappointements = data;
          console.log(this.listappointements);
      })
     }


     async getInvoicesByUser() {
      this.redditService.getByid(this.table8, this.iduser).subscribe(data=>{
          this.listinvoices = data;
      })
     }


     async getQuotesByUser() {
      this.redditService.getByid(this.table10, this.iduser).subscribe(data=>{
          this.listquotes = data;
      })
     }

     async  doSaveProfil() {
      if(this.address!==""||this.cp!==""||this.city!==""||this.state!==""){ 
      this.getGeocode()}
      else{ this.doSaveUser()};
    }
          
     async  doSaveUser() {
     var data = {
      id:this.id,
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
      lat:this.lat, 
      lng:this.lng, 
    }

    this.getGeocode();
          console.log(data); 
           this.redditService.update(this.table,this.iduser,data) 
           .toPromise()
           .then((response) =>
           {console.log(response);
          setTimeout(() => { 
            this.getdata();
          }, 1000); 
    })}
          
    

    async getGeocode() {
    this.map.remove();
    this.redditService.getGeocode(this.address+this.cp+this.city).subscribe(data=>{
    this.lng = data.features[0].geometry.coordinates[0];
    this.lat = data.features[0].geometry.coordinates[1];
    this.editpage();
    this.leafletMap();
    });  
    }



   async  doSaveInvoiceProfil() {
    var data = {
       shipping_address: this.shipping_address,
       shipping_cp:this.shipping_cp,
       shipping_city: this.shipping_city,
       shipping_state: this.shipping_state,
       shipping_country: this.shipping_country,
       shipping_phone: this.shipping_phone,
       billing_phone: this.billing_phone,
       siret_number: this.siret_number,
       tva_number: this.tva_number,
    
     }
 
    
    this.redditService.update(this.table,this.iduser,data) 
    .toPromise()
    .then((response) =>
    {  console.log(response);
    setTimeout(() => { 
    this.editpage2();
    this.getdata();
    }, 400);         
  })}

 async newcontrat() {
  this.router.navigateByUrl('/form1/' + this.iduser);
 }


 async form2(event: any, item: any) {
  console.log(item.id);
  this.router.navigateByUrl('/form2/' + item.id +"/"+ this.iduser);
 }



 async form3(event: any, item: any) {
  console.log(item.id);
  this.router.navigateByUrl('/form3/' + item.id +"/"+ this.iduser);
 }

 cancel() {
  this.modal.dismiss(null, 'cancel');
}


onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if (ev.detail.role === 'confirm') {
  }
}

doSave(){
  var data = JSON.stringify({ 
    start_at: this.datestart,
    user_id: this.iduser,
    title:"Demande d'intervention",
    content:this.content,
    state:1,
    });
   
  this.redditService.addPost(this.table3,data)  
  .subscribe(async (response) => {
   console.log(response); 
    setTimeout(() => { 
      this.modal.dismiss(null, 'cancel');
      this.getAppointementsByUser();     
     }, 1500); 
  })
}
  
searchTech(){
    var data = JSON.stringify({ 
      lat:this.lat, 
      lng:this.lng
      });
    this.redditService.addPost(this.table5,data)  
    .subscribe(async (response) => {
    console.log(response);
    this.userstech = response.data;
    this.iduserselected = this.userstech[0].id
    })
  }

doSaveSelected(){
    var data = JSON.stringify({ 
      start_at: this.datestart,
      user_id: this.iduser,
      edited_by: this.iduserselected,
      title:"Demande d'intervention",
      content:this.content,
      state:2,
      });

console.log(data); 
      
    this.redditService.addPost(this.table6,data)  
    .subscribe(async (response) => {
      console.log(response); 
    })

    setTimeout(() => { 
      this.modal.dismiss(null, 'cancel');
      this.iduserselected==null; 
      this.getAppointementsByUser();
     }, 1500); 
    
  }


  doCreatedInvoice(){
      var data = JSON.stringify({ 
        CustomerID: this.iduser,
        ItemPrice : 0.00,
        Quantity:0.00, 
        ItemName:"Nouveau produit", 
        ItemDesc:"Description",
        ItemTotal:0.00,
        ItemTax1:21.00,
        InvoiceStatus:'Overdue'

        });
      this.redditService.addPost(this.table7,data)  
      .subscribe(async (response) => {
        console.log(response); 
        setTimeout(() => { 
          this.router.navigateByUrl('/invoice/' + response.InvoiceID);
          this.modal.dismiss(null, 'cancel');
         }, 1500); 
      })
  }


  doCreatedQuote(){ 
        var data = JSON.stringify({ 
          CustomerID: this.iduser,
          ItemPrice : 0.00,
          Quantity:0.00, 
          ItemName:"Nouveau produit", 
          ItemDesc:"Description",
          ItemTotal:0.00,
          ItemTax1:21.00
          });
        this.redditService.addPost(this.table9,data)  
        .subscribe(async (response) => {
          console.log(response); 
          setTimeout(() => { 
            this.router.navigateByUrl('/quote/' + response.InvoiceID);
            this.modal.dismiss(null, 'cancel');
           }, 1500); 
        })
  }

  async editpage() {
    this.edit=!this.edit;
   }

   async editpage2() {
    this.edit2=!this.edit2;
   }

}