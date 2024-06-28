import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'app-create-eventplanning',
  templateUrl: './create-eventplanning.page.html',
  styleUrls: ['./create-eventplanning.page.scss'],
})
export class CreateEventplanningPage implements OnInit {


  id: number;
  table: string="schedulerManagment/eventPlanning/create";
  table2: string="schedulerManagment/training/list";

  data: any;
  posts: any;
  content: string="";
  image:string="";
  title: string="";
  email: any;
  address: any;
  city: any;
  cp: any;
  phone: any;
  firstname: any;
  lastname: any;
  per_page:number=10;
  filter: any="";
  page: number;
  events: any;
  deadlineTask: Date;
  priority: number=1;
  event: any;
  iduser: any;

  dayHourEvent: Date= new Date();
  deadline: Date= new Date();
  nbrAttendant: any= 2;

  Date = new Date()
  last_page: any;
  currentpage: any;
  total: any;
  trainings: any;
  trainingId: any;


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

    this.storage.get('iduser').then((val) => {
      this.iduser=val;
    });

   this.page=1;
    this.redditService.allData(this.table2).subscribe(data => {
      console.log(data);
      this.trainings=data.trainings;
    
    })

  }
   doSave(){

var data = {
  "dayHourEvent": this.dayHourEvent,
  "nbrAttendant":  this.nbrAttendant,
  "deadline": this.deadline,
  "trainingId":this.trainingId,
  "hostId":  this.iduser
};

console.log(data);

this.redditService.addPost(this.table,data)  
.subscribe(async (response) => {
    setTimeout(() => { 
    this.router.navigateByUrl('/calendar');
   }, 400); 
})
}


onChangeType(event){
  console.log(event.target.value);
  this.trainingId =event.target.value;
}

}


