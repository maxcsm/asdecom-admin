import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  posts: any;
  title: any;
  price: any;
  content: any;
  url: any;
  image: any;
  id: any;
  table: string="products";
  file: any;

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
      this.id= params['id']; 
      this.getdata(); 
     });
   }

   async getdata() {
    this.redditService.getByid(this.table, this.id).subscribe(data=>{
        this.posts = [data];
        this.title = this.posts[0].title;
        this.content = this.posts[0].content;
        this.url = this.posts[0].url;
        this.image = this.posts[0].image;
        this.price = this.posts[0].price;
      })
   }

     async  doSave() {
     var data = {
      id:this.id,
      title: this.title,
      content: this.content,
      price: this.price,
      url: this.url,
      image: this.image
    }

           this.redditService.update(this.table,this.id,data) 
           .toPromise()
           .then((response) =>
           {
             console.log(response);
             setTimeout(() => { 
             this.getdata();
             this.router.navigateByUrl('/products');
            }, 600); 
           
           })}
          
    


onFileChange(event:any) {
  this.file = event.target.files[0];
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
  { console.log(response);
    //this.image="https://images/"+response.image;
    setTimeout(() => { 
   }, 500); 
  })
}



async  doCancel() {
this.router.navigateByUrl('/products');
}


}