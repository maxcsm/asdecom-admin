import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-public-post',
  templateUrl: './public-post.page.html',
  styleUrls: ['./public-post.page.scss'],
})
export class PublicPostPage implements OnInit {
  posts: any;
  title: any;
  price: any;
  content: any;
  url: any;
  image: any;
  id: any;
  table: string="public_post";
  file: any;
  gallery: any;
  idgallery: any;

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
            this.gallery = data;
            console.log(this.gallery);
      })
       
   }





}