import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.page.html',
  styleUrls: ['./menu-home.page.scss'],
})
export class MenuHomePage implements OnInit {
  posts: any;

  constructor(  public redditService:RedditService) { }

  ngOnInit() {
    this.getData(); 
  }


  async getData() {
    this.redditService.getDataAll("public_posts_short").subscribe(data => {
        this.posts=data.data;  
        console.log(data); 
      })
    }


  





}
