import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalService } from 'src/providers/local.service';
import { ModalQuestionPage } from '../modal-question/modal-question.page';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {
  posts: any;
  title: any;
  price: any;
  content: any;
  url: any;
  image: any;
  id: any;
  table: string="questions/questions_survey";
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
        ['insert', ['link', 'picture']],
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
  iduser: any;
  idquestion:any;
 


  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private localStore: LocalService,
    private modalCtrl: ModalController ) {

   }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.id=params['id']; 
      this.getdata(); 
     // this.galleryByPost();
      this.iduser = this.localStore.getItem('iduser');
      this.UrlImage=this.redditService.getUrlImage();
     });
   }

   async getdata() {
    this.redditService.getByid(this.table, this.id).subscribe(data=>{
        this.posts =data;
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
      order: this.order
    }
    console.log(data); 
    this.redditService.update(this.table,this.id,data) 
    .toPromise()
    .then((response) =>{

      if(this.category=="news"){
        setTimeout(() => { 
          this.router.navigateByUrl('/posts');
          }, 600);     
       } else if(this.category=="page") 
       {
        setTimeout(() => { 
        this.router.navigateByUrl('/public-posts');
      }, 600); 
       }  
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



async delete(event: any, item: { id: number; }) {
  this.idquestion=item.id;
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
       this.redditService.delete("questions",this.idquestion)  
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




 async edit(event: any, item: { id: number; }) {
  const modal = await this.modalCtrl.create({
    component: ModalQuestionPage,
    componentProps: {
    "paramID":item.id,
    }
  });


  modal.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
    //  this.imgsign = dataReturned.data;


        setTimeout(() => { 
         this.getdata();
       }, 400); 
    
    }
  });
  return await modal.present();
}  


addquestion(){
  var data = JSON.stringify({ 
    category: this.id,
    edited_by:this.iduser, 
    view:0
  });


  console.log(data); 
this.redditService.addPost("questions", data)  
  .subscribe((response) => {

    this.getdata();
      setTimeout(() => { 
     }, 400); 
})}

}