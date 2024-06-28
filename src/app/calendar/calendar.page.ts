import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { AlertController, LoadingController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { ActivatedRoute, Router, withEnabledBlockingInitialNavigation } from '@angular/router';
import { withInterceptors } from '@angular/common/http';
     
@Component({
        selector: 'app-calendar',
        templateUrl: './calendar.page.html',
        styleUrls: ['./calendar.page.scss'],
  })
export class CalendarPage implements OnInit {


  calendarOptions!: CalendarOptions;
  eventsModel: any;
  table: string="appointements";
  table2: string="users";
  status:number=0;
  category:number=0;
  category2:number=2;
  filter: any="";
  filter2: any="";
  word: any="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=100;
  per_page2:number=100;
  order_id:any="id";
  order_by:any="desc";
  tabBarElement: any;
  supplier: any;
  postData: any;
  startdate:any = "2023-01-01";
  enddate: any= "2025-06-17";
  startdateselect: any;
  title: any;
  iduser: any;
  firstname: any;
  lastname: any;
  page:any=1;
  posts: any;
  currentpage: any;
  priority:boolean=true;
  events: any;
  eventsdata: any;
  handleDate: any;
  content: any;
  message: any;
  eventid: any;
  lngevnt: number=0;
  roleUser: any;
  postsevents!: any[];
  userId: any;
  techniciens: any;
  technicienId: any;
  color: any;
  techs: any;
  appointement: any;





  constructor(
    public navCtrl: NavController,
     private route: ActivatedRoute,
     private router: Router,  
     public loadingController: LoadingController, 
     public redditService: RedditService, 
     public toastCtrl: ToastController,
     public popoverController: PopoverController,
     public alertController: AlertController

  ) {}


  
  ngOnInit() {
  this.getData();
  this.getUserTechnicien();


  var calendar = document.getElementById('calendar');
  this.calendarOptions = {
    timeZone: 'UTC',
    locale: 'fr',
    plugins: [dayGridPlugin, interactionPlugin],
    editable: false,
    initialView: 'dayGridMonth',
 //  initialView: 'timeGridDay',
    firstDay:1,
    scrollTime:15,
  
   /*next: {
        text: 'Next',
        click: function() {
            //     console.log(calendar.currentRange);
        }
      },
    },*/
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    contentHeight: 'auto',
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false
    },
    buttonText: {
      today:    'Aujourd hui',
      month:    'mois',
      week:     'semaine',
      day:      'jour',
      list:     'list'
    },
    displayEventTime:true,

    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleDateClick.bind(this),
    //eventClick: this.handleEventClick.bind(this),
 //   eventDragStop: this.handleEventDragStop.bind(this),
    select: this.handleDateSelect.bind(this),

    //handleFullcalendar(this),
     visibleRange: function(currentDate) {
      // Generate a new date for manipulating in the next step
      var startDate = new Date(currentDate.valueOf());
      var endDate = new Date(currentDate.valueOf());
 
      // Adjust the start & end dates, respectively
      startDate.setDate(startDate.getDate() - 1); // One day in the past
      endDate.setDate(endDate.getDate() + 2); // Two days into the future
  
      return { start: startDate, end: endDate };
    }
};
}

async handleEventClick(arg: { event: { _def: { extendedProps: { name: any; data: string; }; title: any; }; }; }) {
console.log(arg.event._def.extendedProps);
let id = arg.event._def.extendedProps['data'];
    console.log(arg);
    console.log(arg.event._def.extendedProps.name);
    this.title = arg.event._def.title;
    this.message = this.title;
    const alert = await this.alertController.create({
      header: this.title ,
      subHeader: "",
      message:  this.content,
      buttons: [
      {
          text: 'Voir plus',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.router.navigateByUrl('/edit-eventplanning/' + arg.event._def.extendedProps.data);
       
          }
      },
      {
        text: 'Fermer',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }
    ]
    });

    await alert.present();

  }

  handleDateSelect(arg: any) {
    console.log(arg);
  }
  
  handleEventDragStop(arg: any) {
    console.log(arg);
  }

  handleDateClick(arg: any) {
    console.log(arg.event._def.extendedProps);
    this.eventid = arg.event._def.extendedProps['data'];
    this.getdataByid();
    console.log("DATE CLICKED !!!");
   // console.log(arg);
  }

  updateEvents() {
    const nowDate = new Date();
    const yearMonth = nowDate.getUTCFullYear() + '-' + (nowDate.getUTCMonth() + 1);

  
  }
  handleFullcalendar(arg: any){
    console.log(arg);
  }

getData(){

this.page=1;
this.redditService.getDataBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
  this.posts=data.data;
  this.total=data.total;
  let arr: {}[] = [];
  this.posts.forEach((value: { start_at: any; title: any;state: any; content: any; id: any; }): any => {
    if(value.state==1){ this.color ="#eb445a"};
    if(value.state==2){ this.color ="#ffc409"};
    if(value.state==3){ this.color ="#2dd36f"};
     
      return arr.push({
        start: value.start_at,
        title: value.title,
        content: value.content,
        stick : true,
        allDay : false,
        rendering: 'background',
       // color: '#ff9f89',
        backgroundColor:this.color,
       // eventColor: "#eb445a",
        data: value.id
      });  
})
  this.calendarOptions.events = arr;
   })  
}

async getdataByid() {
  this.redditService.getByid(this.table, this.eventid).subscribe(data=>{
      this.postsevents = data.users;
      this.techs = data.techs;
      this.appointement = [data.appointement]; 
      this.lngevnt  =  this.techs.lenght; 
  })
 }

async getUserTechnicien(){
      this.page=1;
      this.redditService.getDataBypage(this.page,this.table2,this.per_page,this.order_id,this.order_by,this.category2,this.status,this.filter).subscribe(data => {
        this.techniciens=data.data;
      })
}  
onChangeType(event: any){
  this.technicienId=event.target.value;
}

async  doUpdateAppointement() {
  var data = JSON.stringify({
    edited_by:this.technicienId,
    state:2
  }); 
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
     
       
      
      this.redditService.update(this.table,this.eventid,data) 
      .toPromise()
      .then((response) =>

      {
        setTimeout(() => { 
          this.getdataByid();
       }, 400); 
      
      })}}]
    });
    await alert.present();

 }


 async doFinishedAppointement() {
  var data = JSON.stringify({
    state:3
  }); 
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
     
      this.redditService.update(this.table,this.eventid,data) 
      .toPromise()
      .then((response) =>

      {
        setTimeout(() => { 
          this.getData();
          this.getdataByid();
       }, 1000); 
      
      })}}]
    });
    await alert.present();

 }



}

