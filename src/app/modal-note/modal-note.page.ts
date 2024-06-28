import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController, NavParams, PopoverController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';



@Component({
  selector: 'app-modal-note',
  templateUrl: './modal-note.page.html',
  styleUrls: ['./modal-note.page.scss'],
})
export class ModalNotePage implements OnInit {


  table: string="users";
  commentnote: any="";
  note:number=5;
  commentaire: any="";
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
   
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  async doSave() {
    const postData = {
      commentaire: this.commentaire,
      note:this.note
     };

    console.log(postData);
    const onClosedData= [{postData }];
    await this.modalController.dismiss(onClosedData);
  }
}
