import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController, InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-appointements',
  templateUrl: './appointements.page.html',
  styleUrls: ['./appointements.page.scss'],
})
export class AppointementsPage implements OnInit {

  @ViewChild(IonModal)
  modal!: IonModal;

  table: string="programme";

  id: any;
  pages: any;
  items: any;
  posts: any;
  page:number;

  title: string="";
  content: string="";
  price: any;
  age_max!: number;
  age_min!: number;
  autorisation_parentale: any;
  intervenant: any;
  nb_free: any;
  nb_places: any;


  status:any="";
  category:any="";
  filter:string="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=20;
  order_id:any="start_at";
  order_by:any="asc";
  currentpage!: number;
  formgroup!: FormGroup;
  validations_form!: FormGroup;
  image: any;
  url: any;
  sessions: any;
  session_id: any;

  start_at: any = new Date().toISOString();
  end_at: any = new Date().toISOString();
  state: any;
  ateliers: any;
  atelier_id: any;
  constructor
  ( public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController, 
    public menu: MenuController,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController ) {
    this.page=1;
  }
  ngOnInit() {}

  ionViewWillEnter(){
    this.getData();
    this.getAllSessionsOpen(); 
    this.getAllAteliers();
   

  }
  async getData(){
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;
        this.redditService.getDataBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
        loading.dismiss();
          this.posts=data.data;
          this.total=data.total;
          this.per_page=data.per_page;
          this.currentpage=data.current_page;    
          this.last_page=data.last_page;   
        })
  }  
  
  
  next(event: any ) {
     if (this.currentpage<this.last_page){
     this.page = this.page +1 ;
      this.redditService.getDataBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
        let postspush = data.data;
        for (let post of postspush) {
          this.posts.push(post);
        }
        this.total=data.total;
        this.per_page=data.per_page;
        this.currentpage=data.current_page;    
        this.last_page=data.last_page; 
       
      }) 
      event.target.complete();  
    }  else    {
      event.target.complete();  
    }
  }
  

  async  doInfinite(event:any) {
    this.next(event);
  }

  handleChange(event:any) {
   const query = event.target.value.toLowerCase();
   this.filter = query
   this.filter=event.target.value;
   this.page=1;

   setTimeout(() => { 
     this.getDataFilter();
    }, 1000);
  }
  async getDataFilter(){ 
        this.page=1;
        this.redditService.getDataBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
          this.posts=data.data;
          this.total=data.total;
          this.per_page=data.per_page;
          this.currentpage=data.current_page;    
          this.last_page=data.last_page;   
        })
  }  
  
  async onChangeWord(event:any){
    this.filter=event.target.value;
    this.page=1;

    setTimeout(() => { 
      this.getDataFilter();
     }, 1000);
}
        
  onCancelword(selectedValue: any) {
       this.filter=="";
  }
            
reset(){
      this.filter="";
      this.page=1;
      this.per_page=20;
      this.getData();
}

cancel() {
  this.modal.dismiss(null, 'cancel');
}
onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
}

doSave(){

  var data = JSON.stringify({ 
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
    
  });

  this.redditService.addPost("appointements", data)  
  .subscribe((response) => {
    console.log(response); 
    this.modal.dismiss();
      setTimeout(() => { 
        this.getData();
     }, 400); 
  })
  }


prev() {
    if  (this.page>1){
    this.page = this.page -1;
    this.getData();}}


forward(){
    if  (this.currentpage<this.last_page){
    this.page = this.last_page
   this.redditService.getDataBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
      console.log(data);
      this.posts=data.data;
      this.total=data.total;
      this.per_page=data.per_page;
      this.currentpage=data.current_page;    
      this.last_page=data.last_page;   
    })
}}

backward() {
  if  (this.currentpage>1){
  this.page=1;
  this.getData();}
}

async edit(event: any, item: any) {
this.router.navigateByUrl('/appointement/' + item.id);
}

async delete(event: any, item: { id: number; }) {
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
         this.redditService.delete("appointements",this.id)  
         .toPromise()
         .then((response) =>
         {
         setTimeout(() => { 
         this.getData();
      }, 400); 
         })}}]
       });
     await alert.present();
    }


  async getAllSessionsOpen() {
      this.redditService.getDataAll("openSessions").subscribe(data => {
          this.sessions=data.data;  
          this.session_id=this.sessions[0].id; 
        })
      }



  async getAllAteliers(){
    this.page=1;
    this.redditService.getDataBypage(1,"allateliers",100,"id","desc",4,"","").subscribe(data => {
      this.ateliers=data.data;  
    })
}  
 }
  
  