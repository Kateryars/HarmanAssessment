import { Component, OnInit } from "@angular/core";
import { FlickerImagesService } from "./flicker-images.service";
import { FlickerResponseData, ResponseItem } from "./classes/flickerResponseData";

declare var $: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private flickerService: FlickerImagesService) {}

  public flickerData: FlickerResponseData = {
    title:"", link:"", description:"", modified: new Date(), generator:"", items:[]
  };
  private page: number = 1;

  ngOnInit() {    
    // To call api for initial image rendering  
    this.getPhotos(this.page);
  }

  // When scroll down the screen  
  onScroll()  
  {  
    console.log("Scrolled");  
    this.page = this.page + 1;  
    this.getPhotos(this.page);  
  }

  private getPhotos(pageNumber : number){
    // Tried using JsonpModule and normal HttpClient for getting data. However, none worked so using Jquery.
    
    let urlJquery = "https://api.flickr.com/services/feeds/photos_public.gne?_page="+pageNumber+"&format=json&jsoncallback=?";
    console.log("url", urlJquery);
    $.getJSON(urlJquery, response=>{
      var converted = this.convertToClass(response);
      if(this.flickerData.items.length <= 0){        
          this.flickerData = converted;
        }
        else{
          converted.items.forEach(item => {
            this.flickerData.items.push(item);
          });
        }
      });
  }

  private convertToClass(data) : FlickerResponseData{
    var convertedObjet: FlickerResponseData = {
      title:"", link:"", description:"", modified: new Date(), generator:"", items:[]
    }
    convertedObjet.title = data.title;
    convertedObjet.link = data.link;
    convertedObjet.description = data.description;
    convertedObjet.modified = new Date(data.modified);
    convertedObjet.generator = data.generator;

    data.items.forEach((item,index) => {
      var itemObj: ResponseItem = {title:"", link:"", media:{m:""}, date_taken:"", description:"", published: new Date(), author:"", author_id:"", tags:""}
      itemObj.author = item.author;
      itemObj.author_id = item.author_id;
      itemObj.date_taken = item.date_taken;
      itemObj.description = item.description;
      itemObj.link = item.link;
      itemObj.title = item.title;
      itemObj.media = item.media;
      itemObj.published = new Date(item.published);
      itemObj.tags = item.tags;
      convertedObjet.items.push(itemObj);
    });

    
    
    
    return convertedObjet;

  }
  
}

