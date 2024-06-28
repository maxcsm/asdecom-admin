import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  posts: any;
  title: any;
  price: any;
  content: any;
  url: any;
  image: any;
  id: any;
  table: string="posts";
  file: any;
  gallery: any;
  idgallery: any;
  editurl: boolean=false;
  config = {
    placeholder: 'Votre description ici...',
    tabsize: 2,
    height: 200,
    uploadImagePath: '/api/upload',
    dialogsInBody: true,
    toolbar: [
        ['misc', ['codeview', 'undo', 'redo']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['link', 'picture']]
    
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Times']
  }
  public editorValue: string = '';


  UrlBase: string="";
  UrlImage: string="";
  subtitle: any;
  view: any;
 


  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController) {

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
      view: this.view
    }
    console.log(data); 
    this.redditService.update(this.table,this.id,data) 
    .toPromise()
    .then((response) =>{
    setTimeout(() => { 
    this.getdata();
    this.router.navigateByUrl('/services');
    }, 600);     
    })}
          


async editurlseo() {
    this.editurl=!this.editurl;
}

onFileChange(event:any) {
  this.file = event.target.files[0];
  console.log(this.file);
  this.submitForm()
;}

async submitForm() {
  let formData = new FormData();
  formData.append("image", this.file, this.file.name);
  formData.append("title", "Image ");
  console.log(formData); 
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
  console.log(this.file);
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



}