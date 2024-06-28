import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { runInThisContext } from 'vm';

import { LocalService } from 'src/providers/local.service';
import { AuthenticationService } from 'src/providers/authentication.service';
import { UsersColocPage } from '../users-coloc/users-coloc.page';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {format} from "date-fns";
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  
    @ViewChild(IonModal)
    modal!: IonModal;

    public editorValue: string = '';
    table: string="products";
    table1: string="users";
    table3: string="appointements";
    table2: string="projects_byuser";
    table4: string="appointementByUser";
    table5: string="getlocation";
    table6: string="saveappointement";
    table7: string="invoices";
    table8: string="invoicesByUser";
    table10: string="quotesByUser";
    table11: string="return";
    
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
    edit3:boolean=false;
    edit4:boolean=false;
    edit5:boolean=false;
    edit6:boolean=false;

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
    datestart: Date= new Date();
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
    iduserselected: any;
    listinvoices: any;
    listquotes: any;
   
    catresult: any=[];
    page: number | undefined;

  
    category:string="";
    status: string ="";
    filter: string ="";
    products: any;

  moyendepaiement: any;
  lastname_activite: any;
  firstname_activite: any;
  birthdate_activite: any;

  onStep3Form!: FormGroup;
  idinvoice: any;
  urlcheckout: string="";
  token: any;
  reponseToken: any;
  totalprice: number=0;
  amount1: number=0;
  amount2:number=0;
  amount3: number=0;
  priceTotal=0;
  nbselect=0;
  checkoutIntentId: any;
  centre_regionale: any;
  arrived_date: any;
  user_avatar: any;
  birthdate: any;
  age: any;
  parcours: any;
  regime_alim: any;
  resa_hotel: any;
  transport: any;
  code: any;
  session_image: any;
  color: any;
  birth_date: any;
  sexe: any;
  colodata: any;
  idcolocataire: any;
  postscolocataire: any;
  format: any;
  base64: string | undefined;
  editpicture: boolean=false;
  sessions: any;
  session_id: any;
  postsprogramme: any;
  session_title: any;
  categories: any;
  per_page:number=300;
  order_id:any="id";
  order_by:any="asc";
  postsrecap: any;
  label1: any;
  label2: any;
  label3: any;
  label4: any;
  label5: any;
  label6: any;
  label7: any;
  label8: any;
  label9: any;
  label10: any;
  label: any;
 

    constructor(
      private localStore: LocalService,
      public navCtrl: NavController, 
      public formBuilder: FormBuilder,
      public popoverCtrl: PopoverController,
      public alertController: AlertController,
      private route: ActivatedRoute,
      public LoadingController:LoadingController,  
      public redditService:RedditService, 
      private router: Router,  
      public toastCtrl: ToastController,
      private authService: AuthenticationService,
      public modalController: ModalController) {
  
     }

     ngOnInit() {
      this.route.params.subscribe(params => {
         this.iduser= params['id']; 
         this.getdata(); 
        
      

         this.getAllSessionsOpen();
         this.getCategories();

         setTimeout(() => { 
          this.getDataRecap();
          }, 1500); 


        });
      }


    async  badge() {
    this.router.navigateByUrl('/badge/' + this.code);
    }
   

    async  tbadge() {
      this.getdataprogramme(); 
    }
     

    async  sendbadge() {
      this.getdataprogramme2(); 
    }
     
    

      
   async  doSaveUser() {

    
    if(this.resa_hotel=='Je réserve une chambre individuelle.'){
      this.idcolocataire==0
    } 
    if(this.salutation=='Mme.'){
      this.color="#e6007e"
    }else if (this.salutation=='M.'){
      this.color="#2196F3"
    }


    var data = {
     id:this.id,
     salutation: this.salutation,
     firstname: this.firstname,
     lastname: this.lastname,
     address: this.address,
     cp:this.cp,
     company:this.company,
     city: this.city,
     state: this.state,
     country: this.country,
     phone_mobile: this.phone_mobile,
     phone_number: this.phone_number,
     customer_type: this.customer_type,
     parcours : this.parcours,
     centre_regionale:this.centre_regionale,
     arrived_date:this.arrived_date,
     sexe: this.sexe,
     birth_date:this.birthdate,
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
     role:this.role,
     category:this.category,
     regime_alim:this.regime_alim,
     resa_hotel:this.resa_hotel,
     transport:this.transport,
     coloc:this.idcolocataire,
     color:this.color,
     user_avatar:this.user_avatar,
     session_id:this.session_id, 
     email:this.email
   }
   this.redditService.update(this.table1,this.iduser,data) 
   .toPromise()
   .then(async (response) =>
   {console.log(response);
   setTimeout(() => { 
   this.closeall(); 
   this.getdata();
   
   }, 400); 
          
 })}
         


       
 async change1() {
  // this.updatedata(); 
 setTimeout(() => { 
   this.updatedata(); 
   }, 400); 
 
 }
 
 async change2() {
   setTimeout(() => { 
   this.updatedata(); 
   }, 400); 
 }
 
 async change3() {
   setTimeout(() => { 
   this.updatedata(); 
   }, 400); 
 }
 
 async change4() {
 
   setTimeout(() => { 
   this.updatedata(); 
   }, 400); 
 }
 
        
 async change5() {
 
   setTimeout(() => { 
   this.updatedata(); 
   }, 400); 
 }
 
 
 async change7() {
   if(this.label7==1){
     this.label8=0;
   }
   setTimeout(() => { 
   this.updatedata(); 
   }, 400); 
 }
 
 async change8() {
   if(this.label8==1){
     this.label7=0;
   }
   setTimeout(() => { 
   this.updatedata(); 
   }, 400); 
 }
 
 async change9() {
 
   if(this.label9==1){
     this.label10=0;
   }
   setTimeout(() => { 
   this.updatedata(); 
   }, 400); 
 }
 async change10() {
 
   if(this.label10==1){
     this.label9=0;
   }
   setTimeout(() => { 
   this.updatedata(); 
   }, 400); 
 }
 
 


async getPresent() {
  this.redditService.getByid(this.table1, this.iduser).subscribe(data=>{
      this.posts = data;
      this.label1=data[0].label1;
      this.label2=data[0].label2;
      this.label3=data[0].label3;
      this.label4=data[0].label4;
      this.label5=data[0].label5;
      this.label6=data[0].label6;
      this.label7=data[0].label7;
      this.label8=data[0].label8;
      this.label9=data[0].label9;
      this.label10=data[0].label10;

      if(this.idcolocataire!==0){
      this.getdataColocataire(); 
      } 
      this.getSessionProfil(); 

    })
 }



async updatedata() {

  var data = {
    label1:this.label1,
    label2:this.label2,
    label3:this.label3,
    label4:this.label4,
    label5:this.label5,
    label6:this.label6,
    label7:this.label7,
    label8:this.label8,
    label9:this.label9,
    label10:this.label10
  }

  console.log(data); 
  this.redditService.update(this.table1,this.iduser,data) 
.toPromise()
.then(async (response) =>
{
 console.log(response);
  this.getPresent();
})

}


 async getdata() {
  this.redditService.getByid(this.table1, this.iduser).subscribe(data=>{
      this.posts = data;

      console.log(data); 
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
      this.centre_regionale = data[0].centre_regionale;
      this.arrived_date = data[0].arrived_date;
      this.customer_type = data[0].customer_type;
      this.notes = data[0].notes;
      this.user_avatar = data[0].user_avatar;
      this.birthdate= data[0].birth_date;
      this.age=this.calculAge();
      this.parcours= data[0].parcours;
      this.sexe= data[0].sexe;
      this.category= data[0].category;
      this.role= data[0].role;
      this.email= data[0].email;
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
      this.code= data[0].code;

      this.regime_alim=data[0].regime_alim;
      this.resa_hotel=data[0].resa_hotel;
      this.transport=data[0].transport;
      this.color=data[0].color;
      this.idcolocataire=data[0].coloc;
      this.session_id=data[0].session_id;

      this.label1=data[0].label1;
      this.label2=data[0].label2;
      this.label3=data[0].label3;
      this.label4=data[0].label4;
      this.label5=data[0].label5;
      this.label6=data[0].label6;
      this.label7=data[0].label7;
      this.label8=data[0].label8;
      this.label9=data[0].label9;
      this.label10=data[0].label10;

      if(this.idcolocataire!==0){
      this.getdataColocataire(); 
      } 
      this.getSessionProfil(); 

    })
 }


calculAge(){
  return this.calculateLifeSpan(this.birthdate, new Date().toISOString().slice(0, 10))
}


calculateLifeSpan = (birthdateString: string, deathDayString: string): number => {
const birthdate = new Date(birthdateString);
const dayOfDeath = new Date(deathDayString);
let age = dayOfDeath.getFullYear() - birthdate.getFullYear();
const monthDifference = dayOfDeath.getMonth() - birthdate.getMonth();
if (monthDifference < 0 || (monthDifference === 0 && dayOfDeath.getDate() < birthdate.getDate())) {
    age--;
}
return age;
}

async editpage() {
    this.edit=!this.edit;
}

async editpage2() {
    this.edit2=!this.edit2;
}

async editpage3() {
    this.edit3=!this.edit3;
    this.catresult=[];
}

async editpage4() {
  this.edit4=!this.edit4;
}

async editpage5() {
  this.edit5=!this.edit5;
}

async editPicture() {
  this.editpicture=!this.editpicture;
}


async closeall() {
  this.edit=false;
  this.edit2=false;
  this.edit3=false;
  this.edit4=false;
}
  
async seachcoloc() {
  const modal = await this.modalController.create({
    component: UsersColocPage
  });
 modal.onDidDismiss().then((dataReturned) => {
         if (dataReturned !== null) {
        this.colodata = dataReturned.data;
        this.idcolocataire = this.colodata[0].postData.idcoloc;
        this.doSaveUser(); 
  }});
return await modal.present();
}  
async closeModal() {
 await this.modalController.dismiss(undefined, "close")
}

async getdataColocataire() {
  this.redditService.getByid("users", this.idcolocataire).subscribe(data=>{
    console.log(data);
      this.postscolocataire = data;
    })
}

async logout() {
  const alert = await this.alertController.create({
    header: "Déconnexion",
    message: "Voulez-vous vraiment ? ",
    buttons: [
      {
        text: "Annuler",
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: "Oui",
        handler: () => {
          setTimeout(() => {

            this.authService.logout()
          }, 1000);
        }
      }]
  });
  await alert.present();
}


async addFormGallery() {
  console.log("-----ADD FROM GALLERY------");  
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Base64, // file-based data; provides best performance
    quality: 1, // highest quality (0 to 100)
    source: CameraSource.Photos
    //CameraSource:PHOTOS
  });
 
  const loader = await this.LoadingController.create({
   message: "Enregistrement de l'image",
   duration: 2500
   });
   loader.present();
  
   this.format=capturedPhoto.format;
   this.user_avatar="data:image/png;base64,"+capturedPhoto.base64String;
   this.doSaveUser(); 

 }
 
 
 async addFormCamera() {
   const capturedPhoto = await Camera.getPhoto({
   resultType: CameraResultType.Base64, 
   quality: 1, 
   source: CameraSource.Camera
   });
   const loader = await this.LoadingController.create({
     message: "Enregistrement de l'image",
     duration: 2500
     });
   loader.present();
   this.format=capturedPhoto.format;
   this.user_avatar="data:image/png;base64,"+capturedPhoto.base64String;
   this.doSaveUser(); 
  }
  

  async getAllSessionsOpen() {
    this.redditService.getDataAll("openSessions").subscribe(data => {
        this.sessions=data.data;  
      })
    }

  async getSessionProfil() {
    console.log(this.session_id); 
      this.redditService.getByid("sessions",  this.session_id).subscribe(data=>{
        console.log(data); 
        this.session_image = [data][0].image;
        this.session_title = [data][0].title;
      })
    }
  

  
  
  async getdataprogramme(){
      this.page=1;

      this.redditService.getAgendaBygroupBypage(this.page,"GetAgendaByUser",this.per_page,this.order_id,this.order_by,this.category,this.session_id,this.iduser,this.status,this.filter).subscribe(data => {

      console.log(data);
 
      let result = data.appointements.reduce((acc: { date: any;name: any;month: any;year: any;day: any; events: any[]; }[], curr: { start_at: any }) => {
          let item = acc.find(item => item.date === format(new Date(curr.start_at), "dd-MM-yyyy"));
          if (item) {
            console.log(curr); 
            item.events.push(curr);
          } else {
            acc.push({
              "date":format(new Date(curr.start_at), "dd-MM-yyyy"),
              "name":this.getDayName(new Date(curr.start_at)),
              "month":this.getMonthName(new Date(curr.start_at)),
              "year":this.getYearName(new Date(curr.start_at)),
              "day":format(new Date(curr.start_at), "dd"),
              "events": [curr]
            });
          }
          return acc;
        }, []);
        this.postsprogramme=result;  
        console.log(this.posts); 
        this.savePdf();
      })
}  


async getdataprogramme2(){
  this.page=1;
  this.redditService.getAgendaBygroupBypage(this.page,"GetAgendaByUser",this.per_page,this.order_id,this.order_by,this.category,this.session_id,this.iduser,this.status,this.filter).subscribe(data => {
  console.log(data);

  let result = data.appointements.reduce((acc: { date: any;name: any;month: any;year: any;day: any; events: any[]; }[], curr: { start_at: any }) => {
      let item = acc.find(item => item.date === format(new Date(curr.start_at), "dd-MM-yyyy"));
      if (item) {
        console.log(curr); 
        item.events.push(curr);
      } else {
        acc.push({
          "date":format(new Date(curr.start_at), "dd-MM-yyyy"),
          "name":this.getDayName(new Date(curr.start_at)),
          "month":this.getMonthName(new Date(curr.start_at)),
          "year":this.getYearName(new Date(curr.start_at)),
          "day":format(new Date(curr.start_at), "dd"),
          "events": [curr]
        });
      }
      return acc;
    }, []);
    this.postsprogramme=result;  
    this.sendPdf();
  })
}  




getDayName(date: Date): string {
 // Options pour formater la date
 const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
 // Renvoie le nom complet du jour en utilisant toLocaleDateString
 return date.toLocaleDateString(undefined, options);
}


getMonthName(date: Date): string {
 // Options pour formater la date
 const options: Intl.DateTimeFormatOptions = { month: 'long' };
 // Renvoie le nom complet du mois en utilisant toLocaleDateString
 return date.toLocaleDateString(undefined, options);
}


getYearName(date: Date): string {
 // Options pour formater la date
 const options: Intl.DateTimeFormatOptions = { year: 'numeric' };
 // Renvoie le nom complet du mois en utilisant toLocaleDateString
 return date.toLocaleDateString(undefined, options);
}

async savePdf() {
const loader = await this.LoadingController.create({
message: 'enregistrement',
});
loader.present();

   console.log(this.postsprogramme);
   var data = { 
   userid:this.iduser,
   clientid:"",
   bloc1:this.postsprogramme[0],
   bloc2:this.postsprogramme[1],
   bloc3:this.postsprogramme[2],
   sessionid:this.session_id, 
   sessionimage:this.session_image,
   sessiontitle:this.session_title
   }; 
   console.log(data); 
   this.redditService.addPost("saveformpdf1",data)
       .subscribe((response) => {
        console.log(response);
       setTimeout(() => { 
         this.url= response;
             loader.dismiss();
              this.presentToast(); 
              window.open("https://api.asdecom.fr/pdf/"+this.url);

         }, 1000); 
     },(error: any) => {console.log(error);});
   }

     
async presentToast() {
 const toast = await this.toastCtrl.create({
   message: 'Vos données sont enregistrées.',
   duration: 3000
 });
 toast.present();
}

async sendPdf() {
  const loader = await this.LoadingController.create({
  message: 'enregistrement',
  });
  loader.present();
  
     console.log(this.postsprogramme);
     var data = { 
     userid:this.iduser,
     clientid:"",
     bloc1:this.postsprogramme[0],
     bloc2:this.postsprogramme[1],
     bloc3:this.postsprogramme[2],
     sessionid:this.session_id, 
     sessionimage:this.session_image,
     sessiontitle:this.session_title
     }; 
     console.log(data); 
     this.redditService.addPost("sendform1",data)
         .subscribe((response) => {
          console.log(response);
         setTimeout(() => { 
           this.url= response;
               loader.dismiss();
                this.presentToastSend(); 
           }, 1000); 
       },(error: any) => {console.log(error);});
     }
  
       
  async presentToastSend() {
   const toast = await this.toastCtrl.create({
     message: 'Vous allez recevoir votre PDF par email.',
     duration: 3000
   });
   toast.present();
  }
  
  getCategories() {
    this.redditService.getDataAll("public_tags").subscribe(data=>{
        this.categories = data;
      })
  }
  
  
   async getDataRecap(){
    this.page=1;
    console.log(this.category); 
    this.redditService.getAgendaBygroupBypage(this.page,"GetAgendaByUserRecap",this.per_page,this.order_id,this.order_by,this.category,this.session_id,this.iduser,this.status,this.filter).subscribe(data => {
    console.log(data);
  
    let result = data.appointements.reduce((acc: { date: any;name: any;month: any;year: any;day: any; events: any[]; }[], curr: { start_at: any }) => {
        let item = acc.find(item => item.date === format(new Date(curr.start_at), "dd-MM-yyyy"));
        if (item) {
          console.log(curr); 
          item.events.push(curr);
        } else {
          acc.push({
            "date":format(new Date(curr.start_at), "dd-MM-yyyy"),
            "name":this.getDayName(new Date(curr.start_at)),
            "month":this.getMonthName(new Date(curr.start_at)),
            "year":this.getYearName(new Date(curr.start_at)),
            "day":format(new Date(curr.start_at), "dd"),
            "events": [curr]
          });
        }
        return acc;
      }, []);
      this.postsrecap=result;  
    console.log(   this.postsrecap); 
    })
  }  

 async change(event: any, item2: any) {
     var data = {
        user_id:this.iduser,
        appointement_id:item2.id,
        idfk:item2.idfk,
        value:event.target.checked
      }

      console.log(data); 
     this.redditService.addPost("addcheckappoint",data) 
     .toPromise()
     .then((response) =>
     {  



       console.log(response); 
     setTimeout(async () => { 
 if(event.target.checked==false){
   const toast = await this.toastCtrl.create({
     cssClass: 'success',
     message: 'Vous avez supprimé votre présence ',
     duration: 3000,
     position: 'bottom',
 
   });
   toast.present();
 
 } else if(event.target.checked==true){
   const toast = await this.toastCtrl.create({
     cssClass: 'success',
     message: 'Vous avez validé votre présence ',
     duration: 3000,
     position: 'bottom',
   });
   toast.present();
   };
   }, 100);  
   })
 }


 
 

}

