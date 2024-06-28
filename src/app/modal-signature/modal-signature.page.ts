import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController, NavParams, PopoverController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import SignaturePad from 'signature_pad';


@Component({
  selector: 'app-modal-signature',
  templateUrl: './modal-signature.page.html',
  styleUrls: ['./modal-signature.page.scss'],
})
export class ModalSignaturePage implements OnInit {

  @ViewChild('sPad', { static: true })
  signaturePadElement!: { nativeElement: HTMLCanvasElement; };


  modelId: number=0;
  firstname: any;
  lastname: any;
  table: string="users";

  signaturePad: any;
  signBase64!: Blob;
  imgsign: any;

  constructor( 
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute, 
    public redditService:RedditService, 
    private router: Router, 
    public toastCtrl: ToastController,
    private _sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    public modalController: ModalController,     
    private navParams: NavParams) { }


  ngOnInit() {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.modelId = this.navParams.data['paramID'];
    console.log(this.modelId);
   // console.table(this.navParams);
   // this.modelId = this.navParams.data.paramID;
   // this.modalTitle = this.navParams.data.paramTitle;
      this.getdata(); 
  }



  async getdata() {
    this.redditService.getByid(this.table, this.modelId).subscribe(data=>{
        this.firstname = data[0].firstname;
        this.lastname = data[0].lastname;

      })
   }


  async closeModal() {
    const onClosedData: string = this.imgsign;
    await this.modalController.dismiss(onClosedData);
  }



   
  changeColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const color = 'rgb(' + r + ',' + g + ',' + b + ')';
    this.signaturePad.penColor = color;
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
 
    }
    this.imgsign==null; 
  }




  download(dataURL: string , filename: string) {
    if (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1) {
      window.open(dataURL);
    } else {
      const blob = this.dataURLToBlob(dataURL);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
    }
  }

  dataURLToBlob(dataURL: string) {
    // Code taken from https://github.com/ebidel/filer.js
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

  saveSignOLD() {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = this.signaturePad.toDataURL();
      this.imgsign = this.signaturePad.toDataURL();
      console.log( dataURL);

     // this.signBase64=this.dataURLToBlob(dataURL);
     // console.log( this.signBase64);
    }
  }



  savePNG() {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = this.signaturePad.toDataURL();
      this.download(dataURL, 'signature.png');
    }
  }

  saveJPG() {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = this.signaturePad.toDataURL('image/jpeg');

      console.log(dataURL);
     // this.download(dataURL, 'signature.jpg');
    }
  }

  saveSVG() {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = this.signaturePad.toDataURL('image/svg+xml');
      this.download(dataURL, 'signature.svg');
    }
  }
  async savesign() {
    //const dataURL = this.signaturePad.toDataURL();
      this.imgsign = this.signaturePad.toDataURL();
    //console.log( dataURL);
      console.log( this.imgsign); 

      this.closeModal(); 
      this.undo();
     

  }


}
