import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, MenuController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UsersMenuPage } from '../users-menu/users-menu.page';
import { LocalService } from 'src/providers/local.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  pages: any;
  items: any;
  posts: any;
  postspush: any;
  datapost: any;
  page: number;
  region: string | undefined;
  currentpage: any;
  status: number = 0;
  category: number = 0;
  table: string="threads_user_id";
  filter: any = "";
  word: any = "";
  wordid: any = "";
  total: number = 0;
  last_page: number = 0;
  per_page: number = 10;
  order_id: any = "id";
  order_by: any = "desc";
  tabBarElement: any;
  supplier: any;
  loader: any;
  id: any;
  iduser: any;
  token: any;
  idtoken: any;
  message: any;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController, 
    public alertController: AlertController, 
    public menu: MenuController,

    public redditService: RedditService, 
    private router: Router, 
    public toastCtrl: ToastController, 
    public modalController: ModalController,
    private localStore: LocalService,
    private loadingCtrl: LoadingController) {
    this.page = 1;

  }

  async ngOnInit() {
  
  }


  async ionViewWillEnter() {
    this.iduser = this.localStore.getItem('iduser');
    this.getData();
  }
 

  onSearchChange(event: { target: { value: any; }; }){
    this.filter=event.target.value;
       this.page=1;
       setTimeout(() => { 
        // this.getData();
        this.getData();
       }, 500);   
  }
        
  onCancelword(selectedValue: any) {
       this.filter=="";
  }

  async getData(){


      this.page=1;
      this.redditService.getDataBypageByUser(this.iduser,this.page,this.table,this.per_page,this.order_id, this.order_by, this.category, this.status, this.filter).subscribe(data => {
        console.log(data),
        this.message=data.data;
        this.total=data.total;
        this.per_page=data.per_page;
        this.currentpage=data.current_page;    
        this.last_page=data.last_page;   
    
      })
}  

doInfinite(event: { target: { complete: () => void; }; }) {
  if (this.currentpage < this.last_page) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.redditService.getDataBypageByUser(this.iduser,this.page,this.table,this.per_page,this.order_id, this.order_by, this.category, this.status, this.filter).subscribe(data => {
        let postspush = data.data;
        for (let post of postspush) {
          this.message.push(post);
        }
        this.total=data.total;
        this.currentpage=data.current_page;    
        this.last_page=data.last_page;  
      });
      event.target.complete();
    }, 1000);
  } else {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
  doRefresh(event: { target: { complete: () => void; }; }) {
    setTimeout(() => {
      this.getData();
      event.target.complete();
    }, 2000);
  }



async view(event: any, msg: { seen: null; first_id: any; thread_id: string; 
  last_message: {id: any, thread_id: any, seen:any}, from_id: {id: any}}) {

  console.log(msg);

  if(msg.last_message.seen==0&&msg.from_id.id!==this.iduser) {
console.log("read");
console.log("UPDATE MESSAGE"); 

var data = JSON.stringify({
  seen: 1,
});

console.log(data); 
  this.redditService.update("messages",msg.last_message.id,data) 
  .toPromise()
  .then(async (response) =>
  {console.log(response);
  setTimeout(() => { 
    this.router.navigateByUrl('/message/' + msg.thread_id);
  }, 400); 
         
})
} else {
  setTimeout(() => { 
    this.router.navigateByUrl('/message/' + msg.thread_id);
  }, 400); 


}



}


async addthread() {
  const modal = await this.modalController.create({
    component: UsersMenuPage
  });
  await modal.present();
}
async closeModal() {
  await this.modalController.dismiss(undefined, "close")
}
}