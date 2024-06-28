import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController, InfiniteScrollCustomEvent, IonModal, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/providers/local.service';
@Component({
  selector: 'app-users-menu',
  templateUrl: './users-menu.page.html',
  styleUrls: ['./users-menu.page.scss'],
})
export class UsersMenuPage implements OnInit {


  @ViewChild(IonModal)
  modal!: IonModal;
  rolename: string="client";
  role:any=1;

  table: string="usersAlpha";

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
  email_verified_at: any;
  currentpage!: number;

  
  email: any;
  address: any;
  city: any;
  cp: any;
  phone: any;
  firstname: any;
  lastname: any;
  company: any;
  formgroup!: FormGroup;
  validations_form!: FormGroup;


  category:any="";
  session_id:any;
  employees: any;
  outputalphabet: any;
  iduser: any;

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
    public modalController: ModalController,
    private localStore: LocalService ) {
    this.page=1;
  }


  ionViewWillEnter() {
    this.session_id = this.localStore.getItem('session_id');
    this.iduser = this.localStore.getItem('iduser');
    this.getData();

  }

  ngOnInit() {}
    
  async getData(){
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;
        this.redditService.getDataBygroupBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.session_id, this.status,this.filter).subscribe(data => {
        loading.dismiss();
           this.outputalphabet;
           this.outputalphabet = data.allletter
           .reduce((acc: { alphabet: any; 0: any; record: any[]; }[], curr: { firstname: any; }) => {
             const idx = acc.findIndex(e => e.alphabet === curr.firstname[0]);
             if (idx === -1) {
               acc.push({
                 alphabet: curr.firstname[0], record: [curr],
                 0: undefined
               });
             }
             else {
               acc[idx].record.push(curr); 
               acc[idx].record.sort((r1, r2) => r1.name > r2.name ? 1 : -1);
             }
             return acc;
           }, [])
           .sort((e1: { alphabet: number; }, e2: { alphabet: number; }) => e1.alphabet > e2.alphabet ? 1 : -1);
         
         console.log(this.outputalphabet );
  
        })
  }  
  

  next(event: any ) {
     if (this.currentpage<this.last_page){
     this.page = this.page +1 ;
      this.redditService.getDataBygroupBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.session_id, this.status,this.filter).subscribe(data => {
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

   this.getDataFilter();

  }
  
  async getDataFilter(){ 
      
        this.redditService.getDataBygroupBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.session_id, this.status,this.filter).subscribe(data => {
           console.log(data); 
           this.outputalphabet;
           this.outputalphabet = data.allletter
           .reduce((acc: { alphabet: any; 0: any; record: any[]; }[], curr: { firstname: any; }) => {
             const idx = acc.findIndex(e => e.alphabet === curr.firstname[0]);
             if (idx === -1) {
               acc.push({
                 alphabet: curr.firstname[0], record: [curr],
                 0: undefined
               });
             }
             else {
               acc[idx].record.push(curr); 
               acc[idx].record.sort((r1, r2) => r1.name > r2.name ? 1 : -1);
             }
             return acc;
           }, [])
           .sort((e1: { alphabet: number; }, e2: { alphabet: number; }) => e1.alphabet > e2.alphabet ? 1 : -1);
         
         console.log(this.outputalphabet );
  
        })
  }  
  
  async onChangeWord(event:any){
    this.filter=event.target.value;
    this.page=1;

    setTimeout(() => { 
      this.getDataFilter();
     }, 500);
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


async closeModal() {
  await this.modalController.dismiss(undefined, "close")
}


async view($event: any, item: { id: string; firstname: string; lastname: string; }) {
        setTimeout(() => {
          this.modalController.dismiss();
          this.router.navigateByUrl('/messagenew/' + item.id+'/'+item.firstname+'/'+item.lastname);
        }, 1000);
}

 edit(event: any, item: any) {
this.router.navigateByUrl('/user-detail/' + item.id);
}



 }
  
  


