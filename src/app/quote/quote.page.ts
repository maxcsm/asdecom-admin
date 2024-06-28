import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.page.html',
  styleUrls: ['./quote.page.scss'],
})
export class QuotePage implements OnInit {


  public editorValue: string = '';


  config = {
    placeholder: '',
    tabsize: 2,
    height: 200,
    uploadImagePath: '/api/upload',
    toolbar: [
        ['misc', ['codeview', 'undo', 'redo']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
    
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Times']
  }

  table: string="quotes/";
  table2: string="projects_byuser/";
  table3: string="quotesid";
  table5: string="updateQuoteId";
  table6: string="quotesend";
  table7: string="addItemQuote";
  table8: string="updateAllpriceQuote";
  table9: string="quotes";
  table10: string="users";
  
  view:boolean=true;
  push: boolean=false;
  data: any;
  posts: any;
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
  editnumber:number = 0;


  ItemName: any;
  iditem: any;
  ItemDesc: any;
  ItemPrice: any;
  ItemTotal: any;
  ItemQuantity: any;
  Quantity: any;
  idinvoiceuser: any;
  InvoiceID: any;
  ItemTax1: any;
  company: any;
  DueDate: any;
  id: any;
  postsTotal: any;
  city: any;
 
  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
 ) { }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.getdata();
  });
  }
  async getdata() {
      this.redditService.getByid(this.table3, this.id).subscribe(data=>{
          this.posts = data.data;
          this.postsTotal = [this.posts[0]];
          this.idinvoiceuser = this.posts[0].CustomerID;
          this.InvoiceID= this.posts[0].InvoiceID;
          this.ItemTax1= this.posts[0].ItemTax1;
          this.DueDate= this.posts[0].DueDate;
          this.getuser();
  })
  }

  async getuser() {
    this.redditService.getByid(this.table10, this.idinvoiceuser).subscribe(data=>{
        this.firstname = data[0].firstname;
        this.lastname = data[0].lastname;
        this.city = data[0].city;
        this.company = data[0].company;
      })
   }

 async doSaveItem() {
  this.editnumber=0;
  this.getdata();
 }

 async editItem(event: any, item: any) {
  console.log(item.id);
  this.editnumber=item.id;
  this.ItemName=item.ItemName;
  this.ItemDesc=item.ItemDesc;
  this.ItemTotal=item.ItemTotal;
  this.ItemQuantity=item.Quantity;
}


async  saveItem(event: any, item: any) {
  this.iditem=item.id;
  var data = {
    ItemName: this.ItemName,
    ItemDesc: this.ItemDesc,
    ItemTotal: this.ItemTotal,
    Quantity: this.ItemQuantity,
    InvoiceID :this.InvoiceID
   }
    this.redditService.updateinvoice(this.table5,this.iditem,data) 
          .toPromise()
          .then((response) =>
          { this.updateAllprice();
            setTimeout(() => { 
           this.getdata();
            this.editnumber=0;
           }, 600);    
  })}

  async  updateAllprice() {
    var data = {
      InvoiceID :this.InvoiceID,
      ItemTax1:this.ItemTax1,
      DueDate:this.DueDate
     }
      this.redditService.updateByid(this.table8,data) 
      .subscribe(async (response) => {
        setTimeout(() => { 
          this.getdata();
         }, 1000); 
      })       
}


async  update() {
  var data = {
    InvoiceID :this.InvoiceID,
    ItemTax1:this.ItemTax1,
    DueDate:this.DueDate}
    this.redditService.updateByid(this.table8,data) 
    .subscribe(async (response) => {
      setTimeout(() => { 
        this.getdata();
       }, 1000); 
    })       
}

async  editInvoiceSetting() {
  this.edit2=!this.edit2;
  console.log(this.edit2); 
}
async  SaveInvoiceSetting() {
  this.update();
  this.edit2=!this.edit2;
  console.log(this.edit2); 
}
  
async  invoicesend() {
  const loader = await this.loadingController.create({
    message: 'Envoi en cours',
    });
    loader.present();
          this.redditService.sendByid(this.table6,this.id) 
          .toPromise()
          .then((response) =>
          {
            setTimeout(() => { 
            //this.editpage();
            this.getdata();
        setTimeout(() => { 
          loader.dismiss();
        }, 1300); 
           }, 400); })
}

async  addItem() {
  var data = JSON.stringify({ 
    InvoiceID :this.InvoiceID,
    CustomerID: this.idinvoiceuser,
    ItemPrice :1.00,
    Quantity:1.00, 
    ItemName:"Nouveau produit", 
    ItemDesc:"Description",
    ItemTotal:1.00,
    ItemTax1:this.ItemTax1
    });
  this.redditService.addPost(this.table7,data)  
  .subscribe(async (response) => {
    console.log(response); 
    setTimeout(() => { 
      this.getdata();
     }, 1000); 
  })
  }

async deleteItem(event: any, item: { id: number; }) {
      this.iditem=item.id;
      const alert = await this.alertController.create({
        header: 'Supprimer',
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
        this.redditService.delete(this.table9,this.iditem)  
          .toPromise()
          .then((response) =>
          {

            console.log(response); 

            this.updateAllprice();
       setTimeout(() => { 
        this.getdata();
       }, 500); 
          })}}]
        });
      await alert.present();
    
     }


}
