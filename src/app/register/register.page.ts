import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { runInThisContext } from 'vm';
import { LocalService } from 'src/providers/local.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild(IonModal)
  modal!: IonModal;

  public editorValue: string = '';


  
  isSubmitted = false;



  table: string="adduser";
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
  password: any;



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
  siren: any;
  id: any;

  formgroup!: FormGroup;
  validations_form!: FormGroup;
  datestart: Date= new Date();
  content: string="";
  iduser: any;
  phone_mobile: any;
  phone_number: any;
  sexe: string="Femme";
  customer_type: any;
  company: any;
  notes: any;
  country: any;
  state: any;
  salutation: any="M.";
  shipping_cp: any;
  shipping_address: any;
  shipping_city: any;
  shipping_state: any;
  shipping_country: any;
  shipping_phone: any;
  billing_phone: any;
  tva_number: any;
  siret_number: any;
  lng: any;
  lat: any;
 
 
  page!: number;
  per_page!: number;
  order_id: any;
  order_by: any;
  status: any;
  filter: any;
  products: any;
  
  birthdate: any;
  regime_alim: any="Par default";
	resa_hotel: any="Je réserve une chambre individuelle.";
	transport: any="Voiture";
  centre_regionale:any;
  arrived_date:any="2023";
  moyendepaiement: any;
  check1: boolean = true;
  check2: boolean = true;
  check3: boolean = true;
  check4: boolean = true;
  check5: boolean = true;
  parcours: string="";


  onStep1Form!: FormGroup;
  onStep3Form!: FormGroup;
  onStep2Form!: FormGroup;
  onStep4Form!: FormGroup;
  adulte1Form: any;
  adulte1!: { prenom: string; nom: string; adresse: string; cp: string; ville: string; telephone: string; };
  adulte2!: { prenom: string; nom: string; adresse: string; cp: string; ville: string; telephone: string; };
  
  
  category:any=[];
  catresult: any=[];
  formsession:boolean=true;
  form0:boolean=false;
  form1:boolean=false;
  form2:boolean=false;
  form3:boolean=false;
  form4:boolean=false;
  form5:boolean=false;



  onRegisterForm!: FormGroup;
  onRegisterForm1!: FormGroup;
  onRegisterForm2!: FormGroup;
  onRegisterForm3!: FormGroup;
  onRegisterForm4!: FormGroup;
  sessions: any;
  birth_date: any;
  session_id: any;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private localStore: LocalService,
    private loadingCtrl: LoadingController) {
   }

  
   ngOnInit() {

    this.getAllSessionsOpen(); 

    
    this.onRegisterForm1 = this.formBuilder.group({
     firstname: ['', [Validators.required, Validators.minLength(1)]],
     lastname: ['', [Validators.required, Validators.minLength(1)]],
     email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
     password: ['', [Validators.required, Validators.minLength(5)]],
     //password2: ['', [Validators.required, Validators.minLength(5)]],
     customer_type: ['', [Validators.required, Validators.minLength(5)]],
     sexe: ['', [Validators.required, Validators.minLength(1)]],
     phone_mobile: ['', [Validators.required,Validators.minLength(10)]],
     birth_date: ['', [Validators.required, Validators.minLength(1)]]
   })


   this.onRegisterForm2 = this.formBuilder.group({
    
    company: ['', [Validators.required, Validators.minLength(1)]],
    address: ['', [Validators.required, Validators.minLength(1)]],
    cp: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', [Validators.required, Validators.minLength(1)]],
    centre_regionale:['', [Validators.required, Validators.minLength(1)]],
  })

   this.onRegisterForm3 = this.formBuilder.group({
    regime_alim: ['', [Validators.required, Validators.minLength(1)]],
    resa_hotel: ['', [Validators.required, Validators.minLength(1)]],
    transport: ['', [Validators.required, Validators.minLength(1)]],
  })

   this.onRegisterForm4 = this.formBuilder.group({
    check1: [true, []],
    check2: [true, [Validators.requiredTrue]], 
    check3: [true, [Validators.requiredTrue]],
    check4: [true, [Validators.requiredTrue]], 
    check5: [true, [Validators.requiredTrue]],
    parcours:['', [Validators.required, Validators.minLength(20)]],
    arrived_date: ['', [Validators.required, Validators.minLength(4)]],
  })

   this.adulte1Form = this.formBuilder.group({
    firstname1: ['', [Validators.required, Validators.minLength(1)]],
    lastname1: ['', [Validators.required, Validators.minLength(1)]],
    address1: ['', [Validators.required, Validators.minLength(1)]],
    cp1: ['', [Validators.required, Validators.minLength(1)]],
    city1: ['', [Validators.required, Validators.minLength(1)]],
    phone_mobile1: ['', [Validators.required,Validators.minLength(10)]],
 })
   
   this.onStep2Form = this.formBuilder.group({
    catresult: ['', [Validators.required, Validators.minLength(1)]],
   })

   this.onStep3Form = this.formBuilder.group({
    moyen: ['', [Validators.required, Validators.minLength(1)]],
   })

   this.onStep4Form = this.formBuilder.group({
   check1: [true, []],
   check2: [true, [Validators.requiredTrue]], 
   check3: [true, [Validators.requiredTrue]]
 })
  // this.getAllproducts();
  }

  async sessionSelect(event: any, item: { id: number; }) {
    this.session_id=item.id;
    this.form1=true;
    this.formsession=false;
   }


  submitForm1(){
    if (this.onRegisterForm1.valid) {
     this.form1=false;
     this.form2=true;
   }
  }

  submitForm2(){
    if (this.onRegisterForm2.valid) {
      this.form2=false;
      this.form3=true;
    }
  }

  submitForm3(){
    if (this.onRegisterForm3.valid) {
      this.form3=false;
      this.form4=true;
   }
  }


  submitForm4(){
    if (this.onRegisterForm4.valid) {
       this.register(); 
   }
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

calculAge(){
    return this.calculateLifeSpan(this.birthdate, new Date().toISOString().slice(0, 10))
}


  async add( event: any, item: any) {
    console.log(item);
    this.catresult.push(item); 
    console.log(this.catresult); 
   // this.router.navigateByUrl('/account/' + item.id);
}



  handleChange() {
    console.log(this.category); 

  }


  get errorControl() {
    return this.onRegisterForm.controls;
  }



    async  register() {

      const loader = await this.loadingController.create({
        message: 'Enregistrement en cours',
        });
        loader.present();
    
      var data = {
        email: this.email,
        salutation: this.salutation,
        firstname: this.firstname,
        lastname: this.lastname,
        address: this.address,
        cp:this.cp,
        company:this.company,
        city: this.city,
        state: this.state,
        country: this.country,
        phone_mobile: this.phone_mobile,
        phone_number: this.phone_number,
        customer_type: this.customer_type,
        parcours : this.parcours,
        centre_regionale:this.centre_regionale,
        arrived_date:this.arrived_date,
        birthdate:this.birth_date,
        notes: this.notes,
        password: this.password,
        shipping_address: this.shipping_address,
        shipping_cp:this.shipping_cp,
        shipping_city: this.shipping_city,
        shipping_state: this.shipping_state,
        shipping_country: this.shipping_country,
        shipping_phone: this.shipping_phone,
        billing_phone: this.billing_phone,
        siret_number: this.siret_number,
        tva_number: this.tva_number,
        role:1,
        session_id:this.session_id,
        category:1,
        regime_alim:this.regime_alim,
        resa_hotel:this.resa_hotel,
        transport:this.transport,
        lat:this.lat, 
        lng:this.lng,
        user_avatar:"data:image/png;base64,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"
      }

           console.log(data); 
             this.redditService.register(data) 
             .toPromise()
             .then(async (response) =>
             {
               console.log(response);

               this.localStore.saveItem('email',this.email);
               this.localStore.saveItem('password',this.password);
               loader.dismiss();



     setTimeout(async () => { 
      handler: async () => {}
      this.router.navigateByUrl('/customers');

      const toast = await this.toastCtrl.create({
        cssClass: 'bg-profile',
        message: 'Inscription réussie ',
        duration: 3000,
        position: 'bottom',
  
      });
      toast.present();
    }, 1000); 
    })
    }


    async getAllSessionsOpen() {
    this.redditService.getDataAll("openSessions").subscribe(data => {
        this.sessions=data.data;  
      })
    }






  }

 



