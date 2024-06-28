import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, IonModal } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from 'src/providers/authentication.service';
import { AuthGuard } from 'src/providers/auth-guard.service';
//import { StorageService } from 'src/providers/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RedditService } from 'src/providers/reddit-service';
import { HTTP } from '@awesome-cordova-plugins/http';
import { TokenInterceptor } from 'src/providers/auth.token.interceptor';
import { Storage } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { LocalService } from 'src/providers/local.service';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    NgxSummernoteModule,
    AppRoutingModule,
    FullCalendarModule,
    BrowserModule,
    IonicModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule

  ],
  providers: [
   // Deeplinks,
    Storage,
    RedditService,
    AuthenticationService,
    AuthGuard,
    IonModal,
    LocalService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
