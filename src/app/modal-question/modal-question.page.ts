import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController, NavParams, PopoverController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';



@Component({
  selector: 'app-modal-question',
  templateUrl: './modal-question.page.html',
  styleUrls: ['./modal-question.page.scss'],
})
export class ModalQuestionPage implements OnInit {



  table: string="users";
  commentnote: any="";
  note:number=5;
  commentaire: any="";
  questionid: any;
  posts: any;
  question: any;
  answer5: any;
  answer1: any;
  answer2: any;
  answer3: any;
  constructor( 
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute, 
    public redditService:RedditService, 
    private router: Router, 
    public toastCtrl: ToastController,
    public modalController: ModalController,     
    private navParams: NavParams) { }

  ngOnInit() {
    this.questionid = this.navParams.data['paramID'];
    this.getdata();
  }


  async getdata() {
    this.redditService.getByid("questions", this.questionid).subscribe(data=>{
      console.log(data);
        this.posts = data[0];
        this.question=data.question;
        this.answer1=data.answer1;
        this.answer2=data.answer2;
        this.answer3=data.answer3;
        this.answer5=data.answer5;
      })
   }


  async closeModal() {
    await this.modalController.dismiss();
  }



  async  doSave() {
    var data = {
     id:this.questionid,
     question: this.question,
     answer1: this.answer1,
     answer2: this.answer2,
     answer3: this.answer3,
     answer5: this.answer5
   }

  this.redditService.update("questions",this.questionid,data) 
  .toPromise()
  .then((response) =>
          {
            console.log(response);
            setTimeout(async () => { 
            this.getdata();
         
           this.closeModal();
           }, 600); 
          
    })}
         
}
