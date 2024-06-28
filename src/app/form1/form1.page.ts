import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import SignaturePad from 'signature_pad';
import { ModalSignaturePage } from '../modal-signature/modal-signature.page';
import { LocalService } from 'src/providers/local.service';
import {format} from "date-fns";


@Component({
  selector: 'app-form1',
  templateUrl: './form1.page.html',
  styleUrls: ['./form1.page.scss'],
})
export class Form1Page implements OnInit, AfterViewInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  public editorValue: string = '';
  table: string="projects";
  table2: string="saveformpdf1";
  table3: string="users";

  category:string="";
  push: boolean=false;
  data: any;
  posts: any;
  content: string="";
  image:string="";
  title: string="";
  viewdata: any;
  transfer: any;
  datareponse: any = [];
  isCollapsed1 = false;
  userslists: any;
  historiques: any;
  bloc1: any;
  bloc2: any;
  bloc3: any;
  bloc4: any;
  bloc5: any;

  bloc1view: any;
  bloc2view: any;
  bloc3view: any;
  bloc4view: any;
  bloc5view: any;

  blocedit: boolean=true;
  blocedit2: boolean=false;
  bloc1edit: boolean=false;
  bloc2edit: boolean=false;
  bloc3edit: boolean=false;
  bloc4edit: boolean=false;
  bloc5edit: boolean=false;
  bloceditsign: boolean=true;
  addblochistorique: boolean=true;
  addblocusers: boolean=true;

  @ViewChild('sPad', { static: true })
  signaturePadElement!: { nativeElement: HTMLCanvasElement; };

  signaturePad: any;
  signaturePad2: any;
  signBase64!: Blob;
  imgsign: any;
  imgsign2: any;
  idsignature: any;
  firstnamesignature: any;
  lastnamesignature: any;
  client: any;
  id: any;
  

  idclient: any;
  dataReturned: any;
  iduser: any;
  tech: any;


  last_page:number=0;
  per_page:number=100;
  order_id:any="id";
  order_by:any="asc";
  page:any;
  session_id: any;
  status: any;
  filter: any;
  url: any;
  postsprogramme: any;


  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router, 
    public toastCtrl: ToastController,
    private _sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    public LoadingController: LoadingController,
    public modalController: ModalController,
    private localStore: LocalService ) {
 }
 

  ngOnInit() {
   this.iduser = this.localStore.getItem('iduser');
   this.route.params.subscribe(params => {
      this.idclient = params['id']; 
      this.getDataSession(); 
  });

  }

  ngAfterViewInit(): void {}
  
   



  async getDataSession(){

    this.redditService.getByid("users", this.iduser).subscribe(data=>{
      console.log(data);
        this.session_id=data[0].session_id;
        this.category=data[0].category;
        this.getData(); 
      })
    

  }



async getData(){
       this.page=1;
       this.redditService.getDataBygroupBypage(this.page,"GetAppointementByCategory",this.per_page,this.order_id,this.order_by,this.category,this.session_id, this.status,this.filter).subscribe(data => {
       console.log(data);
  
       let result = data.appointements.reduce((acc: { date: any;name: any;month: any;year: any;day: any; events: any[]; }[], curr: { start_at: any }) => {
           let item = acc.find(item => item.date === format(new Date(curr.start_at), "dd-MM-yyyy"));
           if (item) {
             item.events.push(curr);
           } else {
             acc.push({
               "date":format(new Date(curr.start_at), "dd-MM-yyyy"),
               "name":this.getDayName(new Date(curr.start_at)),
               "month":this.getMonthName(new Date(curr.start_at)),
               "year":this.getYearName(new Date(curr.start_at)),
               "day":format(new Date(curr.start_at), "dd"),
               "events": [curr]
             });
           }
           return acc;
         }, []);
         this.postsprogramme=result;  
       })
 }  


 getDayName(date: Date): string {
  // Options pour formater la date
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  // Renvoie le nom complet du jour en utilisant toLocaleDateString
  return date.toLocaleDateString(undefined, options);
}


getMonthName(date: Date): string {
  // Options pour formater la date
  const options: Intl.DateTimeFormatOptions = { month: 'long' };
  // Renvoie le nom complet du mois en utilisant toLocaleDateString
  return date.toLocaleDateString(undefined, options);
}


getYearName(date: Date): string {
  // Options pour formater la date
  const options: Intl.DateTimeFormatOptions = { year: 'numeric' };
  // Renvoie le nom complet du mois en utilisant toLocaleDateString
  return date.toLocaleDateString(undefined, options);
}

async savePdf() {
const loader = await this.LoadingController.create({
message: 'enregistrement',
});
loader.present();


    var data = { 
    userid:this.iduser,
    clientid:this.idclient,
    bloc1:this.postsprogramme[0]
    }; 
    console.log(data); 
    this.redditService.addPost(this.table2,data)
        .subscribe((response) => {
         console.log(response);
        setTimeout(() => { 
          this.url= response;

              loader.dismiss();
               this.presentToast(); 
               this.imgsign==""; 
          }, 1000); 
      },(error: any) => {console.log(error);});
    }

      
async presentToast() {
  const toast = await this.toastCtrl.create({
    message: 'Vos données sont enregistrées.',
    duration: 2000
  });
  toast.present();
}




}
