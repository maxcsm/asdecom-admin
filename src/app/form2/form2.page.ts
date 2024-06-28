import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController, InfiniteScrollCustomEvent, IonModal, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LocalService } from 'src/providers/local.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalSignaturePage } from '../modal-signature/modal-signature.page';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.page.html',
  styleUrls: ['./form2.page.scss'],
})
export class Form2Page implements OnInit {

  private file!: File;
  page: number;
  table: string="gallerieBypost";
  table2: string="image-gallery";
  table3: string="projects";
  table4: string="saveformpdf2";
  table5: string="users";

  category:string="";
  push: boolean=false;
  data: any;
  posts: any;
  content: string="";
  image:string="";
  title: string="";
  viewdata: any;
  transfer: any;
  datareponse: any = [];
  isCollapsed1 = false;
  userslists: any;
  historiques: any;
  bloc1: any;
  bloc2: any;
  bloc3: any;
  bloc4: any;
  bloc5: any;

  bloc1view: any;
  bloc2view: any;
  bloc3view: any;
  bloc4view: any;
  bloc5view: any;

  blocedit: boolean=true;
  blocedit2: boolean=false;
  bloc1edit: boolean=false;
  bloc2edit: boolean=false;
  bloc3edit: boolean=false;
  bloc4edit: boolean=false;
  bloc5edit: boolean=false;
  bloceditsign: boolean=true;
  addblochistorique: boolean=true;
  addblocusers: boolean=true;

  @ViewChild('sPad', { static: true })
  signaturePadElement!: { nativeElement: HTMLCanvasElement; };

  signaturePad: any;
  signaturePad2: any;
  signBase64!: Blob;
  imgsign: any;
  imgsign2: any;
  idsignature: any;
  firstnamesignature: any;
  lastnamesignature: any;
  client: any;
  id: any;
  
  label1: any="Avec inspection qualité";
  label2: any="Rongeurs";
  label3: any="Punaise";
  label4: any="1er Passage";
  label5: any="Placement de boites a souris";
  label6: any=100;
  label7: any=100;
  label8: any="Traitement de surface";
  label9: any="Chambre";
  label10: any="";
  label11: any="Exit 100 pro Belgagri";
  label12: any="Aucune infestations constatée (contrôle préventif)";
  label13: any="";
  label14: any=0.00;
  label15: any="Virement";
  imagesform:any= [];


  idclient: any;
  dataReturned: any;
  iduser: any;
  tech: any;
  idappointement: any;
  role: any;
  listimage: any;


  constructor
  ( public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController, 
    public menu: MenuController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    public LoadingController: LoadingController,
    private http: HttpClient,
    private localStore: LocalService,
    private _sanitizer: DomSanitizer,
    public modalController: ModalController ) {
    this.page=1;
  }



  ngOnInit() {
    this.role = this.localStore.getItem('role');
    this.iduser = this.localStore.getItem('iduser');
    this.route.params.subscribe(params => {
       this.idappointement= params['id']; 
       this.idclient = params['idclient']; 
       this.getGallerieByAppointement();
       this.getclient();
       this.gettech();
   
    });
  }

 

  

  ngAfterViewInit(): void {}
  async getclient() {
    this.redditService.getByid(this.table5, this.idclient).subscribe(data=>{
        this.client = data;
        console.log(this.client); 
    })
   }

   async gettech() {
    this.redditService.getByid(this.table5, this.iduser).subscribe(data=>{
        this.tech= data;
    })
   }


getData(){
      this.redditService.postByid(this.table, this.id).subscribe(data=>{
        console.log(data);    
          this.posts = data.project;
          this.bloc1 = data.project[0].bloc1;
          this.bloc1view = this._sanitizer.bypassSecurityTrustHtml(data.project[0].bloc1);
       
        
         

      })
    }

async presentToast() {
      const toast = await this.toastCtrl.create({
        message: 'Vos données sont enregistrées.',
        duration: 2000
      });
      toast.present();
}
 
async savePdf() {
const loader = await this.LoadingController.create({
message: 'enregistrement',
});
loader.present();


var data = JSON.stringify({ 
userid:this.iduser,
clientid:this.idclient,
bloc1: this.imagesform,
img1:this.imgsign,
img2:this.imgsign2,
label1:this.label1.toString(),
label2:this.label2.toString(),
label3:this.label3.toString(),
label4:this.label4.toString(),
label5:this.label5.toString(),
label6:this.label6.toString(),
label7:this.label7.toString(),
label8:this.label8.toString(),
label9:this.label9.toString(),
label10:this.label10.toString(),
label11:this.label11.toString(),
label12:this.label12.toString(),
label13:this.label13.toString(),
label14:this.label14.toString(),
label15:this.label15.toString(),
}); 


console.log(data); 
      this.redditService.addPost(this.table4,data)
             .subscribe((response) => {
              setTimeout(() => { 
             this.router.navigateByUrl('/account/' + this.idclient);
              loader.dismiss();
               this.presentToast(); 
               this.imgsign==""; 
              }, 1000); 
          },(error: any) => {console.log(error);});
         }

         handleChange(event:any) {
          const query = event.target.value;
          console.log(query);
        }


        async openModal() {
          const modal = await this.modalController.create({
            component: ModalSignaturePage,
            componentProps: {
              "paramID": this.idclient,
            }
          });
          modal.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
              this.imgsign = dataReturned.data;
            }
          });
          return await modal.present();
       }  

       async openModalTech() {
        const modal = await this.modalController.create({
          component: ModalSignaturePage,
          componentProps: {
            "paramID": this.iduser,
          }
        });
        modal.onDidDismiss().then((dataReturned) => {
          if (dataReturned !== null) {
            this.imgsign2 = dataReturned.data;
          }
        });
        return await modal.present();
     }  


  onFileChange(event:any) {
    this.file = event.target.files[0];
    console.log(this.file);
    this.submitForm()
  ;}

  async submitForm() {
    let formData = new FormData();
    formData.append("image", this.file, this.file.name);
    formData.append("title", "Image intervention");
    formData.append("postid",  this.idappointement);
    console.log(formData); 
    this.redditService.uploadFormData(formData) 
    .toPromise()
    .then((response) =>
    { console.log(response);
      setTimeout(() => { 
      this.getGallerieByAppointement();
     }, 500); 
    })
  }

  async getGallerieByAppointement() {

  this.imagesform= [];
  this.redditService.getByid(this.table, this.idappointement).subscribe(data=>{
  this.listimage=data;
  console.log("----BLOC 1");
  console.log(  this.listimage);

  
  this.listimage.forEach((value: any) => {
    console.log("---FOREACH----");
   console.log(value);
   console.log(value.image);
   this.imagesform.push(value.image);
  /*   this.imagesform.push( value.image);
*/
  }); 
   console.log(this.imagesform); 

  })
  }

}
