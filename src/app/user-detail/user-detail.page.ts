import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { runInThisContext } from 'vm';
import { LocalService } from 'src/providers/local.service';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  @ViewChild(IonModal)
  modal!: IonModal;

  public editorValue: string = '';

  table: string="users";

  view:boolean=true;
  push: boolean=false;
  data: any;
  posts: any;
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
  priority: any;

  firstname: any;
  lastname: any;
  email: any;
  user: any;
  namebank: any;
  dombank: any;
  iban: any;
  rib: any;
  bic: any;
  profilid: any;
  profilId: any;
  edit:boolean=false;
  edit2:boolean=false;

  segType: string = 'info';
  indicatif : string = '+33';
  phone: any;
  address: any;
  number:any = '';
  complement: any;
  city: any;
  cp: any;
  complemement: any;
  postall: any;
 
  name: any;
  contactList: any;
  partnerId: any;
  phonenew: any;
  firstnamenew: any;
  lastnamenew: any;
  emailnew: any;
  editcontactId: any;
  statuscontactedit: any;
  emailcontactedit: any;
  lastnamecontactedit: any;
  firstnamecontactedit: any;
  statuspartenaire: boolean=false;
  daycreatedAt: any;
  formaddphonetocontact:  boolean=false;

  contactId: any;
  addphone: any;
  indicatifnew:  string = '+33';
  addindicatif: string = '+33';
  phoneId: any;
  phonenumbertype: string = 'MOBILE';
  addtypephone:string = 'MOBILE';
  phonenumbertypenew:string = 'MOBILE';
  clientId: any;
  siren: any;
  id: any;
  files: any;
  formgroup!: FormGroup;
  validations_form!: FormGroup;
  datestart= new Date().toISOString();
  content: string="";
  iduser: any;
  phone_mobile: any;
  phone_number: any;
  company: any;
  notes: any;
  country: any;
  state: any;
  salutation: any;
  customer_type: any;
  shipping_cp: any;
  shipping_address: any;
  shipping_city: any;
  shipping_state: any;
  shipping_country: any;
  shipping_phone: any;
  billing_phone: any;
  tva_number: any;
  siret_number: any;
  role: any;
  client: boolean=false;
  listappointements: any;
  lat: any;
  lng: any;
  userstech: any;
  iduserselected: any=null;
  listinvoices: any;
  listquotes: any;
  user_avatar: any;
  birthdate: any;
  parcours: any;
  age: any;
  centre_regionale: any;
  arrived_date: any;
  session_image: any;
  color: any;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    public modalController: ModalController,
    private localStore: LocalService) {}

  ionViewWillEnter() {}

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.iduser= params['id']; 

      this.iduser = this.localStore.getItem('iduser');
      this.session_image = this.localStore.getItem('session_image');
      this.getdata(); 
     });
   }

     async getdata() {
      this.redditService.getByid(this.table, this.iduser).subscribe(data=>{
        console.log(data);
          this.posts = data;

          this.role= data[0].role;
          if(data[0].role==1){  this.client= true  }; 
          this.salutation= data[0].salutation;
          this.firstname = data[0].firstname;
          this.lastname = data[0].lastname;
          this.address = data[0].address;
          this.cp = data[0].cp;
          this.city = data[0].city;
          this.state = data[0].state;
          this.country= data[0].country;            
          this.phone_mobile = data[0].phone_mobile;
          this.phone_number = data[0].phone_number;
          this.company = data[0].company;
          this.centre_regionale = data[0].centre_regionale;
          this.arrived_date = data[0].arrived_date;
          this.customer_type = data[0].customer_type;
          this.notes = data[0].notes;
          this.user_avatar = data[0].user_avatar;
          
          this.birthdate= data[0].birth_date;
          this.age=this.calculAge();
          this.parcours= data[0].parcours;
          this.shipping_address = data[0].shipping_address;
          this.shipping_cp = data[0].shipping_cp;
          this.shipping_city = data[0].shipping_city;
          this.shipping_state = data[0].shipping_state;
          this.shipping_country= data[0].shipping_country;            
          this.shipping_phone= data[0].shipping_phone;
          this.billing_phone = data[0].billing_phone;
          this.tva_number= data[0].tva_number;
          this.siret_number= data[0].siret_number;
       
          this.color=data[0].color;
        })
     }


  calculAge(){
      return this.calculateLifeSpan(this.birthdate, new Date().toISOString().slice(0, 10))
  }
  

  calculateLifeSpan = (birthdateString: string, deathDayString: string): number => {
    const birthdate = new Date(birthdateString);
    const dayOfDeath = new Date(deathDayString);
    let age = dayOfDeath.getFullYear() - birthdate.getFullYear();
    const monthDifference = dayOfDeath.getMonth() - birthdate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && dayOfDeath.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
}


async sendmessage() {
        setTimeout(() => {
          this.modalController.dismiss();
          this.router.navigateByUrl('/messagenew/' + this.iduser+'/'+this.firstname+'/'+this.lastname);
        }, 1000);
}

    
}