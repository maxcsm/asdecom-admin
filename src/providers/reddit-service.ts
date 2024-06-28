import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, } from 'rxjs';
import { retry, } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';


@Injectable()
export class RedditService {

 URLbase = "https://api.asdecom.fr/api/";
 //URLbase = "http://127.0.0.1:8000/api/";



 URLImage = "https://api.asdecom.fr/";
 //URLImage = "http://127.0.0.1:8000/";


  language: string = "EN";
  exp: any;
  token: any;

  email: any;
  alertmsg: any;
  alertmessage: any;

  constructor(
    public http: HttpClient, 
    public alertController: AlertController,
    public toastCtrl: ToastController) { }

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json',
   // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-XSRF-TOKEN',
   // 'Access-Control-Allow-Origin': 'http://localhost:8080'
  })}


  ngOnInit() { }

  login(data: any): Observable<any> {
    return this.http
      .post<any>(this.URLbase +'login', data, this.httpOptions)
     .pipe(retry(2), catchError(this.handleError))
  }

  register(data: any): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'register', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }


  forgetpassword(data: string): Observable<any> {
    return this.http
      .post<any>(this.URLbase +'forgotpassword',data,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }
  
  adduser(data: any): Observable<any> {
    return this.http
      .post<any>(this.URLbase+'adduser',data,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }
  
  postByid(table: string,id: string): Observable<any> {
    return this.http
      .get<any>(this.URLbase+table+'/'+id,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }
  
  addPost(table: string,data: any): Observable<any> {
    return this.http
      .post<any>(this.URLbase+table,data,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }
  
  update(table: string,id: string, data: any): Observable<any> {
    return this.http
      .put<any>(this.URLbase+table+'/'+id,data,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }
  

  updateinvoice(table: string,id: string, data: any): Observable<any> {
    return this.http
      .post<any>(this.URLbase+table+'/'+id,data,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }


  delete(table: string,id: string): Observable<any> {
    return this.http
      .delete<any>(this.URLbase+table+'/'+id,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }

  sendByid(table: string,id: string): Observable<any> {
    return this.http
      .post<any>(this.URLbase+table+'/'+id,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }

  getDataBypage(page: string | number, table: string, per_page: string | number, order_id: string, order_by: string, category: string | number, status: string | number, filter: string): Observable<any> {
    return this.http
      .get<any>(this.URLbase + table + '?page=' + page + '&per_page=' + per_page + '&order_id=' + order_id + '&order_by=' + order_by + '&category=' + category+'&status=' + status+  '&filter=' + filter)
      .pipe(retry(2), catchError(this.handleError))
  }

  getDataBypageByUser(id:number, page: string | number, table: string, per_page: string | number, order_id: string, order_by: string, category: string | number, status: string | number, filter: string): Observable<any> {
    return this.http
      .get<any>(this.URLbase + table +'/'+id+'?page=' + page + '&per_page=' + per_page + '&order_id=' + order_id + '&order_by=' + order_by + '&category=' + category+'&status=' + status+  '&filter=' + filter)
      .pipe(retry(2), catchError(this.handleError))
  }


  getDataBygroupBypage(page: string | number, table: string, per_page: string | number, order_id: string, order_by: string, category: string | number,session_id: string | number, status: string | number, filter: string): Observable<any> {
    return this.http
      .get<any>(this.URLbase + table + '?page=' + page + '&per_page=' + per_page + '&order_id=' + order_id + '&order_by=' + order_by + '&category=' + category+'&session_id='+session_id+'&status=' + status+  '&filter=' + filter)
      .pipe(retry(2), catchError(this.handleError))
  }


  getDataBypageCalendar(page: string, table: string, per_page: string | number,startdate: string,enddate: string,priority: string | boolean, filter: string): Observable<any> {
    return this.http
      .get<any>(this.URLbase + table + '?page=' + page + '&size=' + per_page +'&startDate=' +startdate+'&endDate=' +enddate+'&active='+priority+'&filter='+filter)
      .pipe(retry(2), catchError(this.handleError))
  }
  
  
  getDataAll(table: string): Observable<any> {
    return this.http
      .get<any>(this.URLbase + table)
      .pipe(retry(2), catchError(this.handleError))
  }


  getByid(table: string,id: number): Observable<any> {
    return this.http
      .get<any>(this.URLbase+table+'/'+id,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }
  
  
  updateByid(table: string, data: any): Observable<any> {
    return this.http
      .post<any>(this.URLbase+table,data,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }


  uploadImage(table: string,data: FormData): Observable<any> {
    return this.http
      .post<any>(this.URLbase+table,data,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }
  
 
  public uploadFormData(formData: any) {
    return this.http.post<any>(this.URLbase+'upload', formData);
  }

  public uploadGalleryImage(formData: any) {
    return this.http.post<any>(this.URLbase+'uploadgalleryimage', formData);
  }



  getAtelierWithNote(table: string,iduser:number, idatelier:number): Observable<any> {
    return this.http
      .get<any>(this.URLbase + table+ '?iduser=' + iduser + '&idatelier=' + idatelier )
      .pipe(retry(2), catchError(this.handleError))
  }


  getDataBypageByMessage(thread_id:number, page: string | number, table: string, per_page: string | number, order_id: string, order_by: string, category: string | number, status: string | number, filter: string): Observable<any> {
    return this.http
      .get<any>(this.URLbase + table+ '?page=' + page + '&per_page=' + per_page + '&order_id=' + order_id + '&order_by=' + order_by + '&category=' + category+'&status=' + status+  '&filter=' + filter+ '&thread_id='+ thread_id)
      .pipe(retry(2), catchError(this.handleError))
  }


  getCodeBar(code: number): Observable<any> {
    return this.http
      .get<any>('https://barcodeapi.org/api/auto/'+code)
      .pipe(retry(2),catchError(this.handleError))
  }
  
 

  savenewMessage(data: any): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'savenewMessage.json', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  updatemessage(data: string): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'updatemessage', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  save_message_app(data: any): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'save_message_app.json', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  readMessage(data: any): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'readMessage.json', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  
  getMessage(data: any): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'getMessage.json', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }


  setMessage(data: any): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'setMessage.json', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  deleteMessage(data: any): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'deleteMessageFirst.json', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }


  getAgendaBygroupBypage(page: string | number, table: string, per_page: string | number, order_id: string, order_by: string, category: string | number,session_id: string | number, iduser: string | number, status: string | number, filter: string): Observable<any> {
    return this.http
      .get<any>(this.URLbase + table + '?page=' + page + '&per_page=' + per_page + '&order_id=' + order_id + '&order_by=' + order_by + '&category=' + category+'&session_id='+session_id+'&user_id='+iduser+'&status=' + status+  '&filter=' + filter)
      .pipe(retry(2), catchError(this.handleError))
  }


  getGeocode(text: string): Observable<any> {
    return this.http
    .get<any>("https://api.geoapify.com/v1/geocode/search?text="+ text +"&apiKey=636cdf779a8c4b778f2cc84de97ced34",this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
  }
  


  getUrlBase() {
    return this.URLbase;
  }
  

  getUrlImage() {
    return this.URLImage;
  }


///////////LOG 

/** Log a HeroService message with the MessageService */
private log(message: string) {
  console.log(message);
}
// Handle API errors
  async handleError(error: HttpErrorResponse) {


    console.log(error);
   // alert(error.error[0].message);
   
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.

    
    console.error('An error occurred:', error.message);



  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
 // return throwError(
  //  'Something bad happened; please try again later.');
};





}