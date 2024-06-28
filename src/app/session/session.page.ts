import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  posts: any;
  title: any;
  price: any;
  content: any;
  url: any;
  image: any;
  id: any;
  table: string="sessions";
  file: any;
  gallery: any;
  idgallery: any;
  editurl: boolean=false;
  config = {
    placeholder: 'Votre description ici...',
    tabsize: 2,
    height: 200,
    uploadImagePath: '/api/upload',
    toolbar: [
        ['misc', ['codeview', 'undo', 'redo']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
    
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Times']
  }
  public editorValue: string = '';


  UrlBase: string="";
  UrlImage: string="";
  subtitle: any;
  view: any;
  category: any;
  order: any;
  format: any;
  label1: any;
  label2:any;
  label3: any;
  label4: any;
  label5: any;
 


  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController, 
    public LoadingController:LoadingController) {

   }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.id=params['id']; 
      this.getdata(); 
      this.galleryByPost();
      this.UrlImage=this.redditService.getUrlImage();
     });
   }

   async getdata() {
    this.redditService.getByid(this.table, this.id).subscribe(data=>{
        this.posts = [data];
        this.title = this.posts[0].title;
        this.subtitle = this.posts[0].subtitle;
        this.content = this.posts[0].content;
        this.url = this.posts[0].url;
        this.image = this.posts[0].image;
        this.price = this.posts[0].price;
        this.view = this.posts[0].view;
        this.category = this.posts[0].category;
        this.order= this.posts[0].order;

        this.label1= this.posts[0].label1;
        this.label2= this.posts[0].label2;
        this.label3= this.posts[0].label3;
        this.label4= this.posts[0].label4;
        this.label5= this.posts[0].label5;
      })
    }
    async galleryByPost() {
      this.redditService.getByid("gallerybypost", this.id).subscribe(data=>{
            this.gallery = data.data;
      })
       
   }

  async  doSave() {

     this.url =  encodeURI(this.title);
     var data = {
      id:this.id,
      title: this.title,
      content: this.content,
      price: this.price,
      url: this.url,
      image: this.image, 
      view: this.view,
      order: this.order,
      label1: this.label1,
      label2: this.label2,
      label3: this.label3,
      label4: this.label4,
      label5: this.label5
    }
    console.log(data); 
    this.redditService.update(this.table,this.id,data) 
    .toPromise()
    .then((response) =>{

    setTimeout(() => { 
    this.router.navigateByUrl('/sessions');
    }, 300);         
    })}
          

    async change1(event: any, label1: any) {
    if(event.target.checked==false){this.label1=1;} else if(event.target.checked==true){this.label1=0;};
    }
    async change2(event: any, label2: any) {
    if(event.target.checked==false){this.label2=1;} else if(event.target.checked==true){this.label2=0;};
    }
    async change3(event: any, label3: any) {
    if(event.target.checked==false){this.label3=1;} else if(event.target.checked==true){this.label3=0;};
    }
    async change4(event: any, label4: any) {
    if(event.target.checked==false){this.label4=1;} else if(event.target.checked==true){this.label4=0;};
    }
    async change5(event: any, label5: any) {
    if(event.target.checked==false){this.label5=1;} else if(event.target.checked==true){this.label5=0;};
    }
async editurlseo() {
    this.editurl=!this.editurl;
}

onFileChange(event:any) {
  this.file = event.target.files[0];
  this.submitForm()
;}

async submitForm() {
  let formData = new FormData();
  formData.append("image", this.file, this.file.name);
  formData.append("title", "Image ");
  this.redditService.uploadFormData(formData) 
  .toPromise()
  .then((response) =>
  {   
    this.image=response;
    setTimeout(() => { 
   
   }, 500); 
  })
}

onFileChangeGallery(event:any) {
  this.file = event.target.files[0];
  this.submitFormGallery();
}

async submitFormGallery() {
  let formData = new FormData();
  formData.append("image", this.file, this.file.name);
  formData.append("title", "Image ");
  formData.append("postid", this.id);
  this.redditService.uploadGalleryImage(formData) 
  .toPromise()
  .then((response) =>
  { this.galleryByPost();
    setTimeout(() => { 
   }, 500); 
  })
}

async delete(event: any, item: { id: number; }) {
  this.idgallery=item.id;
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
       this.redditService.delete("gallery",this.idgallery)  
      .toPromise()
      .then((response) =>
      {
    setTimeout(() => { 
      this.galleryByPost();
       }, 400); 
      })}}]
    });
  await alert.present();
 }


 async  doCancel() {
  setTimeout(() => { 
    this.router.navigateByUrl('/sessions');
    }, 600);     
}



async addFormGallery() {
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
   this.image="data:image/png;base64,"+capturedPhoto.base64String;


 }
 


}