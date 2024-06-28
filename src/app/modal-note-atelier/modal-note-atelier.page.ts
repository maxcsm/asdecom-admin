import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController, NavParams, PopoverController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';



@Component({
  selector: 'app-modal-note-atelier',
  templateUrl: './modal-note-atelier.page.html',
  styleUrls: ['./modal-note-atelier.page.scss'],
})
export class ModalNoteAtelierPage implements OnInit {

  commentnote: any="";
  commentaire: any="";
  note_presentation:number=5;
  note_info:number=5;
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
      note_info:this.note_info,
      note_presentation:this.note_presentation
     };

    console.log(postData);
    const onClosedData= [{postData }];
    await this.modalController.dismiss(onClosedData);
  }
}
