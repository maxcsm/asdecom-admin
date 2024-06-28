
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController, InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/providers/local.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {

  @ViewChild(IonModal)
  modal!: IonModal;
  table: string="sessions";
  id: any;
  pages: any;
  items: any;
  posts: any;
  page:number;
  status:any="";
  filter:string="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=20;
  order_id:any="id";
  order_by:any="desc";
  currentpage!: number;

  formgroup!: FormGroup;
  validations_form!: FormGroup;
  title: string="";
  UrlImage: string="";
  iduser: any;
  content: any;
  category: any;

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
    private loadingCtrl: LoadingController, 
    private localStore: LocalService ) {
    this.page=1;
  }

  ngOnInit() {
    this.UrlImage=this.redditService.getUrlImage();
    this.iduser = this.localStore.getItem('iduser');
  
  }

  ionViewWillEnter(){
    this.getData();
  }

  async getData(){
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
    edited_by:this.iduser, 
    image:"data:image/png;base64,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",
    view:1
  });


this.redditService.addPost(this.table, data)  
  .subscribe((response) => {
    console.log(response)
    this.modal.dismiss();
      setTimeout(() => { 
      this.title="";
      this.content="";
      this.getData();
     }, 400); 

   
})}

prev() {
    if  (this.page>1){
    this.page = this.page -1;
    this.getData();
}}


forward(){
    if  (this.currentpage<this.last_page){
    this.page = this.last_page
   this.redditService.getDataBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
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
this.router.navigateByUrl('/session/' + item.id);
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
       this.redditService.delete(this.table,this.id)  
         .toPromise()
         .then((response) =>{
        setTimeout(() => { 
      this.getData();
      }, 400); 
      })}}]
      });
     await alert.present();
    }
 }
  
  