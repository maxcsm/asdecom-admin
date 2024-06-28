import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-edit-eventplanning',
  templateUrl: './edit-eventplanning.page.html',
  styleUrls: ['./edit-eventplanning.page.scss'],
})
export class EditEventplanningPage implements OnInit {

  public editorValue: string = '';

  id: number;
  table: string="schedulerManagment/training/details?trainingId=";
  table1: string="schedulerManagment/training/update";

  view:boolean=true;
  push: boolean=false;
  data: any;
  posts: any;
  content: string="";
  image:string="";
  title: string="";
  url: string="";
  urlrewiting: string="";
  meta: string="";
  keyword: string="";
  keywords: any;
  deadlineTask: any;
  postdata: any;
  events: any;
  edit:boolean=false;
  priority: any;
  iduser: any;
  duration: any;
  deadline: any;


  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private storage: Storage) {
   }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.id = params['id']; 
  });
  

  this.storage.get('iduser').then((val) => {
    this.iduser=val;
    console.log(this.iduser);
  });

  this.getdata();
  }


    async  doSave() {

      this.postdata.trainingName = this.title;
      this.postdata.trainingDescription =  this.content;
      this.postdata.duration =this.duration;
       this.postdata.deadline=this.deadline;

      console.log(this.postdata);
   
      const alert = await this.alertController.create({
        header: 'Enregistrement',
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
         
           
          
          this.redditService.updateByid(this.table1,this.postdata) 
          .toPromise()
          .then((response) =>

          {
            console.log(response);
            setTimeout(() => { 
            this.editpage();
            this.router.navigateByUrl('/edit-eventplanning/'+this.id);
           }, 400); 
          
          })}}]
        });
        await alert.present();
    
     }


     async editpage() {
      this.edit=!this.edit;
     }
  
     async getdata() {
      this.redditService.getByid(this.table, this.id).subscribe(data=>{
          this.postdata = data;
          this.posts = [data];

          console.log(this.posts);
          this.events=this.posts[0].events;
          this.title = data.trainingName;
          this.content = data.trainingDescription;
          this.duration= data.duration;
          
      })

     }
  
}
