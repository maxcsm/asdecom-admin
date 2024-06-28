import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.page.html',
  styleUrls: ['./organisation.page.scss'],
})
export class OrganisationPage {
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
 
  table: string="posts";
  category:any="organisation";
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
  
      this.UrlImage=this.redditService.getUrlImage();
   }

 

   ionViewWillEnter() {
    this.getData(); 
   }

   async getData(){
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();

      this.redditService.getByid("posts", 3).subscribe(data=>{
        console.log(data); 
          this.posts = [data];
          this.title = this.posts[0].title;
          this.subtitle = this.posts[0].subtitle;
          this.content = this.posts[0].content;
          this.image = this.posts[0].image;
        })
  }  
    async galleryByPost() {
      this.redditService.getByid("gallerybypost", this.id).subscribe(data=>{
            this.gallery = data.data;    
      })
   }





}