export class FlickerResponseData{
    constructor(title: string, link: string, description: string, modified: string, generator: string, items : ResponseItem[]){
      this.title = title,
      this.link = link,
      this.description = description,
      this.modified = new Date(modified),
      this.generator = generator,
      this.items = items
    }
    public title: string;
    public link: string;
    public description: string;
    public modified: Date;
    public generator: string;
    public items: ResponseItem[]
  
  }
  
  export class ResponseItem{
    constructor(title: string, link: string, media: MediaData, date_taken: string, 
      description: string, published: string, author: string, author_id:string, tags:string){
        this.title = title;
        this.link = link;
        this.media = media;
        this.date_taken = date_taken;
        this.description = description;
        this.published = new Date(published);
        this.author = author;
        this.author_id = author_id;
        this.tags =tags;
      }
      public title: string;
      public link: string;
      public media: MediaData;
      public date_taken: string;
      public description: string;
      public published: Date;
      public author: string;
      public author_id: string;
      public tags: string;
  
  }
  
  export class MediaData{
    constructor(m: string) {
      this.m = m;
    }
    public m : string;
  }