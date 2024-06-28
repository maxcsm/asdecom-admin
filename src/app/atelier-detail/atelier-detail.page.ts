import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalNotePage } from '../modal-note/modal-note.page';
import { LocalService } from 'src/providers/local.service';
import { ModalNoteAtelierPage } from '../modal-note-atelier/modal-note-atelier.page';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-atelier-detail',
  templateUrl: './atelier-detail.page.html',
  styleUrls: ['./atelier-detail.page.scss'],
})
export class AtelierDetailPage implements OnInit {


  @ViewChild(IonModal)
  modal!: IonModal;
  modal2!: IonModal;
  posts: any;
  title: any;
  price: any;
  content: any;
  url: any;
  image: any;
  id: any;
  table: string="GetAtelierWithNote";
  table2: string="appointements";
  table3: string="products";
  table4: string="users";
  file: any;
  products: any;
  iduser: any;
  idproduct: any;
  idatelier: any;
  notationatelier: any;
  suppliers: any;
  imageatelier:any= "";
  format: any;
  base64: string | undefined;
  edit: boolean=false;
  contentproduct: any;
  titleproduct: any;
  firstname: any;
  lastname: any;
  email: any;
  website: any;
  session_id: any;
  sessions: any;
  phone: any;
  company: any;
  idfk: any;

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
    private localStore: LocalService,
    private loadingCtrl: LoadingController) {

   }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.idatelier= params['id']; 
     });
   }

   ionViewWillEnter(){
    this.iduser = this.localStore.getItem('iduser');
    this.getdata(); 
    this.getAllSessionsOpen();
   }


   async getdata() {
    this.redditService.getAtelierWithNote(this.table, this.iduser, this.idatelier).subscribe(data=>{
      console.log(data); 
        this.posts = [data.appointement];
        this.title = [data.appointement][0].title; 
        this.content = [data.appointement][0].content; 
        this.imageatelier = [data.appointement][0].image; 
        this.products = [data.products][0];
        this.notationatelier = [data.notationatelier][0];
        this.suppliers = [data.suppliers][0];
      })
   }

     async  doSave() {
     var data = {
      id:this.idatelier,
      title: this.title,
      content: this.content,
      view: 1,
    //  url: this.url,
      image: this.imageatelier
    }
      this.redditService.update(this.table2,this.idatelier,data) 
      .toPromise()
      .then((response) =>
      {
      setTimeout(() => { 
      this.getdata();
      this.editpage(); 
      }, 600); 
           
      })}
          
    
      cancel() {
        this.modalCtrl.dismiss(null, 'cancel');
      }
      
      onWillDismiss(event: Event) {
        const ev = event as CustomEvent<OverlayEventDetail<string>>;
      
      }
      
      async openModal($event: any, item: any) {

    
       this.idproduct=item.id;
        const modal = await this.modalCtrl.create({
          component: ModalNotePage,
          //componentProps: {
          // "paramID": 255225,
          // }
        });
        modal.onDidDismiss().then(async (dataReturned) => {
          if (dataReturned !== null) {
          //this.imgsign = dataReturned.data;
          var data = JSON.stringify({ 
              idproduct:this.idproduct,
              iduser:this.iduser,
              note: dataReturned.data[0].postData.note,
              comment:dataReturned.data[0].postData.commentaire
          });

          const loading = await this.loadingCtrl.create({
            message: 'Enregistrement..',
            spinner: 'bubbles',
          });

          this.redditService.addPost("productnotation", data)  
          .subscribe((response) => {
            console.log(response); 
            loading.dismiss();
              setTimeout(() => { 
               this.getdata();
             }, 400); 
          })
          }
        });
        return await modal.present();
     }  


      
     async openModalNoteAtelier() {
       const modal = await this.modalCtrl.create({
         component: ModalNoteAtelierPage,
      // componentProps: {
       //   "paramID": 255225,
       //  }
       });
       modal.onDidDismiss().then((dataReturned) => {
         if (dataReturned !== null) {
         //  this.imgsign = dataReturned.data;
         var data = JSON.stringify({ 
             
             idatelier:this.idatelier,
             iduser:this.iduser,
             note_info: dataReturned.data[0].postData.note_info,
             note_presentation: dataReturned.data[0].postData.note_presentation,
             comment:dataReturned.data[0].postData.commentaire
         });
         this.redditService.addPost("ateliernotation", data)  
         .subscribe((response) => {
           console.log(response); 
    
             setTimeout(() => { 
              this.getdata();
            }, 400); 
         })
         }
       });
       return await modal.present();
    }  

    async closeModal() {
      await this.modalCtrl.dismiss(undefined, "close")
    }




    async addFormGallery() {
      console.log("-----ADD FROM GALLERY------");  
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64, // file-based data; provides best performance
        quality: 1, // highest quality (0 to 100)
        source: CameraSource.Photos
        //CameraSource:PHOTOS
      });
     
      const loader = await this.loadingCtrl.create({
       message: "Enregistrement de l'image",
       duration: 2500
       });
       loader.present();
      
       this.format=capturedPhoto.format;
       this.imageatelier="data:image/png;base64,"+capturedPhoto.base64String;
  
    
     }
     
     
     async addFormCamera() {
       const capturedPhoto = await Camera.getPhoto({
       resultType: CameraResultType.Base64, 
       quality: 1, 
       source: CameraSource.Camera
       });
       const loader = await this.loadingCtrl.create({
         message: "Enregistrement de l'image",
         duration: 2500
         });
       loader.present();
       this.format=capturedPhoto.format;
       this.imageatelier="data:image/png;base64,"+capturedPhoto.base64String;
  
      }
      
    
  async  doCancel() {
    this.edit=!this.edit;
  }


  async editpage() {
    this.edit=!this.edit;
}


doSaveNewProduct(){
  var data = JSON.stringify({ 
      title: this.titleproduct,
      content: this.contentproduct,
      ref: this.idatelier,

  });
  this.redditService.addPost(this.table3, data)  
  .subscribe((response) => {
    this.modal.dismiss();
      setTimeout(() => { 
        this.getdata();
     }, 400); 
  })
  }

  async deleteproduct(event: any, item: { id: number; }) {
    this.id=item.id;
    const alert = await this.alertController.create({
      header: 'Supprimer',
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
        this.redditService.delete(this.table3,this.id)  
        .toPromise()
        .then((response) =>
        {
        setTimeout(() => { 
        this.getdata();
     }, 400); 
        })}}]
      });
    await alert.present();
  
   }
   







   async editproduct(event: any, item: any) {
    this.router.navigateByUrl('/product/' + item.id);
    }


 doSaveFournissseur(){
  var data = JSON.stringify({ 
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      website: this.website, 
      company:this.company,
      phone_mobile: this.phone,
      role:4, 
      session_id:this.session_id, 
      category:0,
      user_avatar:"data:image/png;base64,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",
      customer_type:"Fournisseur"
  });
  this.redditService.addPost(this.table4, data)  
  .subscribe((response) => {
 
  var data2 = JSON.stringify({ 
       iduser: response.id,
       idatelier: this.idatelier
  });
  this.redditService.addPost("inserfkuser", data2)  
  .subscribe((response) => {

   this.closeModal();
      setTimeout(() => { 
        this.getdata();
     }, 400); 
  })
  })
  }



  async deletefournisseur(event: any, item: {idfk: any; id: number; }) {
    this.idfk=item.idfk;
    var data2 = JSON.stringify({ idfk: this.idfk});
    console.log(data2); 

    const alert = await this.alertController.create({
      header: 'Supprimer',
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
        this.redditService.addPost("destroyFknote", data2)  
        .toPromise()
        .then((response) =>
        {

          console.log(response); 
        setTimeout(() => { 
        this.getdata();
     }, 400); 
        })}}]
      });
    await alert.present();
  
   }

   async editfournisseur(event: any, item: any) {
    this.router.navigateByUrl('/profil/' + item.id);
    }


async getAllSessionsOpen() {
  this.redditService.getDataAll("openSessions").subscribe(data => {
      this.sessions=data.data;  
      this.session_id=this.sessions[0].id; 
    })
  }
}