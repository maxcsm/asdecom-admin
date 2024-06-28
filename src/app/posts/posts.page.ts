import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController, InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/providers/local.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;

  table: string="posts";
  category:any="news";

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
    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
        Validators.maxLength(100),
        Validators.minLength(3),
        Validators.required
      ])),
      content: new FormControl('', Validators.compose([
        Validators.maxLength(100),
        Validators.minLength(3),
        Validators.required
      ])),
    });
  }

  validation_form = {
    'title': [
      { type: 'required', message: 'Titre requis.' },
      { type: 'minlength', message: '3 caractères minimum.' },
      { type: 'maxlength', message: '100 caractères maximum.' },
    ], 
    'content': [
      { type: 'required', message: 'Description requise.' },
      { type: 'minlength', message: '3 caractères minimum.' },
      { type: 'maxlength', message: '100 caractères maximum.' },
    ]
  };

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
    category: "news",
    edited_by:this.iduser, 
    view:1
  });


this.redditService.addPost(this.table, data)  
  .subscribe((response) => {
    this.modal.dismiss();
    this.getData();
      setTimeout(() => { 
      this.router.navigateByUrl('/posts');
      this.title="";
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
this.router.navigateByUrl('/post/' + item.id);
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
  
  