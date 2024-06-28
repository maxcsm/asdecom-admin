import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController, InfiniteScrollCustomEvent, IonModal, Platform } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {format} from "date-fns";
import { LocalService } from 'src/providers/local.service';



@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  @ViewChild(IonModal)
  modal!: IonModal;

  table: string="GetAppointementByCategory";

  id: any;
  pages: any;
  items: any;
  posts: any;
  page:number;

  title: string="";
  content: string="";
  price: any;
  age_max!: number;
  age_min!: number;
  autorisation_parentale: any;
  intervenant: any;
  nb_free: any;
  nb_places: any;
  status:any="";
  category:any;
  filter:string="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=20;
  order_id:any="id";
  order_by:any="asc";
  currentpage!: number;
  formgroup!: FormGroup;
  validations_form!: FormGroup;
  image: any;
  url: any;
  session_id: any;
  alldate:any= [];
  resultData: any;
  testdate: Date= new Date();



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
    private localStore: LocalService,
    private element: ElementRef, 
    private platform: Platform ) {
    this.page=1;
  }
  ngOnInit() {
    this.session_id = this.localStore.getItem('session_id');
    this.category = this.localStore.getItem('category');
    this.getData();
  }

  async getData(){

   console.log(this.getDayName(this.testdate ))
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;

        console.log(this.session_id); 
        this.redditService.getDataBygroupBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.session_id, this.status,this.filter).subscribe(data => {
        console.log(data);
        loading.dismiss();
        let result = data.appointements.reduce((acc: { date: any;name: any;month: any;day: any; events: any[]; }[], curr: { start_at: any }) => {
            let item = acc.find(item => item.date === format(new Date(curr.start_at), "dd-MM-yyyy"));
            if (item) {
              item.events.push(curr);
            } else {
              acc.push({
                "date":format(new Date(curr.start_at), "dd-MM-yyyy"),
                "name":this.getDayName(new Date(curr.start_at)),
                "month":this.getMonthName(new Date(curr.start_at)),
                "day":format(new Date(curr.start_at), "dd"),
                "events": [curr]
              });
            }
            return acc;
          }, []);
          this.posts=result;  
          console.log(this.posts); 
        })
  }  
  
  

async edit(event: any, item2: any) {
  console.log(item2);
this.router.navigateByUrl('/atelier-detail/' + item2.atelier_id);
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

scrollToTop() {
  const content = this.element.nativeElement.closest('ion-content');
  
    content.scrollToTop(300); // You can adjust the duration (in milliseconds) as needed

    window.scrollTo(0, 0); // For non-mobile platforms
  
}


}
  
  
