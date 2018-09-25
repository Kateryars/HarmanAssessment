import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Jsonp } from "@angular/http";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { FlickerResponseData } from "./classes/flickerResponseData";

declare var $: any;

@Injectable({
  providedIn: "root"
})
export class FlickerImagesService {
  constructor(private http: HttpClient, private jsonp : Jsonp) {}
  public flickrResponse : Observable<FlickerResponseData>;

  public getFlickrImagesHttp() {
    let urlNormalHttpCall = "https://api.flickr.com/services/feeds/photos_public.gne?format=json";

    let result : Observable<FlickerResponseData> =  this.http.get(urlNormalHttpCall)
                                      .pipe(
                                        map(res => res as FlickerResponseData), 
                                        catchError(error => Observable.throw("Server Error!")));
    return result;
  }

  public getFlickrImagesJsonp(){
    let urlJsonpCall = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&callbak=JSONP_CALLBACK";


    let result : Observable<FlickerResponseData> =  this.jsonp.request(urlJsonpCall).pipe(
      // .map( res => this.jsonFlickrFeed(res))
      map(response => { 
        return response.json().results.map(item =>{
        return new FlickerResponseData(
                item.title,
                item.link,
                item.description,
                item.modified,
                item.generator,
                item.items
        )
      }); }),
      catchError(error => Observable.throw("Server Error!")));

    return result;
  }

  public getFlickrImagesJquery(){
    let urlJquery = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?";
    $.getJSON(urlJquery, data=>{
        this.flickrResponse = data;
      });
      return this.flickrResponse;
        
    }
    
}


