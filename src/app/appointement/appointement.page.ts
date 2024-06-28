import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { runInThisContext } from 'vm';
import { stringify } from 'querystring';


@Component({
  selector: 'app-appointement',
  templateUrl: './appointement.page.html',
  styleUrls: ['./appointement.page.scss'],
})
export class AppointementPage implements OnInit {


  @ViewChild(IonModal)
  formgroup!: FormGroup;
  validations_form!: FormGroup;
  datestart: Date= new Date();

  modal!: IonModal;
  private file!: File;
  public editorValue: string = '';

  table: string="appointements";
  view:boolean=true;
  push: boolean=false;
  data: any;
  posts: any;
  image:string="";

  url: string="";
  edit:boolean=false;
  edit2:boolean=false;
  id: any;
  files: any;


  title: string="";
  content: string="";
  price: any;
  age_max!: number;
  age_min!: number;
  autorisation_parentale: any;
  intervenant: any;
  nb_free: any;
  nb_places: any;
  birthdate_activite: any;
  firstname_activite: any;
  lastname_activite: any;
  moyendepaiement: any;
  start_at: any;
  end_at: any;
  session_id: any;
  sessions: any;
  state: any;
  category: any;
  ateliers: any;
  atelier_id: any;
  postspost: any;

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
      this.getAllSessionsOpen();
      this.getAllAteliers();
      this.getAllPosts();

     });  
   }

     async getdata() {
      this.redditService.getByid(this.table, this.id).subscribe(data=>{
          this.posts = [data][0].appointement;
          this.title = this.posts.title;
          this.content = this.posts.content;
          this.url = this.posts.url;
          this.image = this.posts.image;
          this.price = this.posts.price;
          this.start_at=this.posts.start_at;
          this.end_at=this.posts.end_at;
          this.session_id=this.posts.session_id;
          this.state=this.posts.state;
          this.category=this.posts.category;
          this.atelier_id=this.posts.atelier_id; 
        })
     }

     async  doSave() {
     var data = {
      id:this.id,
     // salutation: this.salutation,
      title: this.title,
      content: this.content,
      url: this.url,
      image: this.image,
      price:this.price,
      start_at:this.start_at,
      end_at:this.end_at,
      state:this.state,
      category:this.category,
      session_id:this.session_id,
      atelier_id:this.atelier_id
    }

    this.redditService.update(this.table,this.id,data) 
    .toPromise()
    .then((response) =>{
    setTimeout(() => { 
    this.router.navigateByUrl('/appointements');
    }, 600);       
    })}
          
    

 cancel() {
  this.modal.dismiss(null, 'cancel');
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
  { console.log(response);
    this.image=""+response.image;
    console.log(this.image); 
    setTimeout(() => { 
   }, 500); 
  })
}

  async editpage() {
    this.router.navigateByUrl('/appointements');
   }


   onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }



  async getAllSessionsOpen() {
    this.redditService.getDataAll("openSessions").subscribe(data => {
        this.sessions=data.data;  
      })
    }


    async getAllAteliers() {
      this.redditService.getDataBypage(1,"allateliers",200,"id","desc","","","").subscribe(data => {
         this.ateliers=data.data;
       })
    }
  

    async getAllPosts() {
      this.redditService.getDataBypage(1,"posts",200,"id","desc","post","","").subscribe(data => {
         this.postspost=data.data;
         console.log( this.postspost); 
       })
    }

}