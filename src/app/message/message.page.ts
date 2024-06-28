import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController, IonContent } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LocalService } from 'src/providers/local.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  private file: File | undefined;

  category: any;
  status: any;
  message_id: any;
  users: any;
  useridmessage: any;
  read: any;
  tokenid: any;
  tokenvalue: any;
  patient_file_id: any;
  filedata: Object[] | undefined;
  filedataresp: string | undefined;
  filedatares: Object | undefined;


  logScrollStart(event: any) {
    console.log("logScrollStart : When Scroll Starts", event);
  }

  logScrolling(event: any) {
    console.log("logScrolling : When Scrolling", event);
  }

  logScrollEnd(event: any) {
    console.log("logScrollEnd : When Scroll Ends", event);
  }

  ScrollToBottom() {
    this.content.scrollToBottom(1500);
  }
  myid: any;
  to_id: any;
  msg: any;
  getValue: any;
  from_id: any;
  senderid: any;
 
  sender: any;
  per_page: number = 10;
  order_id: any = "id";
  order_by: any = "asc";
  page: any;
  filter: any = "";
  messages: any;
  thread_id: any;
  table: any = "messagesChat";
  table2: any = "messages";
  table3: any = "uploadfilemessage";
  usertable: any = "users";
  chatBox: any = "";
  idmessage: any;
  currentpage: any;
  last_page: any;
  total: any;
  treadstable: any = "treads";
  idtoken: any;
  token: any;
  message: any;
  posts: any;
  iduser: any;
  messagedata: any;
  message_app_user_list: any;
  patient_file_list: any;
  app_user_view_list: any;
  first_id: any;
  id_message: any;
  iduser_message: any;

  @ViewChild(IonContent)
  content!: IonContent;
  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    public redditService: RedditService,
    public loadingController: LoadingController,
    private http: HttpClient,
    private localStore: LocalService,
    private router: Router
  ) {}


  ngOnInit() {


    this.chatBox = "";
    this.route.params.subscribe(params => {
      this.thread_id =params['id']; 
     });


  }
  

  async ionViewWillEnter() {
  
    this.iduser = this.localStore.getItem('iduser');
    this.getData();
    

    setTimeout(() => {
      this.ScrollToBottom();
    }, 800);
  }


  getData(){


    this.redditService.getByid("threads", this.thread_id).subscribe(data=>{
      console.log(data);
      })
   
      console.log(this.thread_id); 
      this.page=1;
      this.redditService.getDataBypageByMessage( this.thread_id,this.page,this.table,this.per_page,this.order_id, this.order_by, this.category, this.status, this.filter).subscribe(data => {
        console.log(data);

        //this.users=data.users.data;
        this.posts=data.messages.data.slice().reverse();
        this.total=data.messages.total;
        this.per_page=data.messages.per_page;
        this.currentpage=data.messages.current_page;    
        this.last_page=data.messages.last_page;   
        
        setTimeout(() => {
          this.ScrollToBottom();
        }, 800);
      })
}  
 
  sendNewMessage(chatBox: any) {


    var data = JSON.stringify({ 
      from_id: this.iduser,
      to_id:"",
      body:this.chatBox,
      thread_id:this.thread_id,
      type_id:0,
      depth:1,
    });


    console.log(data);
    this.redditService.addPost("messageNew",data)  
    .toPromise()
    .then((response) =>{
    console.log(response); 
    this.message_id = response.id;
    setTimeout(async () => { 
    this.getData();
    this.chatBox="";
    }, 400); 
    })
    }


 


readmessage(){
  console.log("READ MESSAGE");
  var data = {
    token_value: this.token,
    token_id: this.idtoken,
      message_id:this.thread_id,


    //  files:""
    }
    
console.log(data);
  this.redditService.readMessage(data)
  .subscribe((response) => {
    console.log(response);
   
  
  },
    error => {
      console.log(error);
    });
}



// start loader
async simpleLoader() {
  this.loadingController.create({
      message: 'Chargement...'
  }).then((response) => {
      response.present();
  });
}
// Dismiss loader
async dismissLoader() {
  this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
  }).catch((err) => {
      console.log('Error occured : ', err);
  });
}


doRefresh(event: { target: { complete: () => void; }; }) {
  if (this.currentpage < this.last_page) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.getData(); 
      event.target.complete();
    }, 600);
  } else {
    setTimeout(() => {
      event.target.complete();
    }, 600);
  }
}

onFileChange(fileChangeEvent: { target: { files: File[]; }; }) {
  this.file = fileChangeEvent.target.files[0];
  this.submitForm()
;}
async submitForm() {
  let formData = new FormData();
/*
  formData.append("file", this.file, this.file.name);
  formData.append("token_id", this.tokenid);
  formData.append("token_value", this.tokenvalue);
  console.log(formData);

  */

  this.http.post("", formData)
  .toPromise()
  .then((response) =>{
  console.log(response);
 this.filedatares= [response];
 //console.log(this.filedatares[0].data.data.patient_file_id);
 //this.patient_file_id= this.filedatares[0].data.data.patient_file_id;
      setTimeout(() => {
      }, 800);
    
    },
      error => {
        console.log(error);
      })

}

back(){
  this.router.navigateByUrl('/tabs/chat');
}



}