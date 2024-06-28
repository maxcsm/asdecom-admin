import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LocalService } from 'src/providers/local.service';


@Component({
  selector: 'app-messagenew',
  templateUrl: './messagenew.page.html',
  styleUrls: ['./messagenew.page.scss'],
})
export class MessagenewPage implements OnInit {

  private file!: File;
  id: any;
  view!: boolean;
  push: boolean = false;
  data: any;
  posts: any;
  item: any;
  network_id: any;
  idtoken: any;
  token: any;
  firstname: any;
  lastname: any;
  content: any;
  iduser: any;
  idusermessage: any;
  title: any;
  firstid: any;
  message_id: any;
  table: any = "messages";
  table2: any = "savemessageapp";
  tokenid: any;
  tokenvalue: any;
  patient_file_id: any;
  filedatares: any;
  read: any;

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public redditService: RedditService,
    public toastCtrl: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private localStore: LocalService) {     


  }


  ngOnInit() {


    this.iduser = this.localStore.getItem('iduser');

    this.route.params.subscribe(params => {
      this.idusermessage = params['id'];
      this.firstname = params['firstname'];
      this.lastname = params['lastname'];
    });
 
}


sendMessage() {
  var data = JSON.stringify({ 

    from_id:this.iduser,
		to_id:this.idusermessage,
    body:this.content,
    thread_id:null,
    type_id:0,
    depth:1,
   



  });
  console.log(data);
  this.redditService.addPost("messageNew",data)  
  .toPromise()
  .then(async (response) =>{
    console.log(response);

    this.message_id = response.message.thread_id;
  

    const toast = await this.toastCtrl.create({
      cssClass: 'bg-profile',
      message: 'Message envoyé',
      duration: 3000,
      position: 'bottom',

    });
    toast.present();
      setTimeout(async () => { 
        this.content="";
        this.router.navigateByUrl('/tabs');
     }, 400); 
  })
  }




 onFileChange(fileChangeEvent: { target: { files: File[]; }; }) {
  this.file = fileChangeEvent.target.files[0];
  this.submitForm()
;}
async submitForm() {
  let formData = new FormData();

  formData.append("file", this.file, this.file.name);
  formData.append("token_id", this.tokenid);
  formData.append("token_value", this.tokenvalue);
  console.log(formData);

  this.http.post("https://app.monkeydoc.com/service/uploadPatientFile.json", formData)
  .toPromise()
  .then((response) =>{
 this.filedatares= [response];
 this.patient_file_id= this.filedatares[0].data.data.patient_file_id;
      setTimeout(() => {
      }, 800);
    
    },
      error => {
        console.log(error);
      })

}
}