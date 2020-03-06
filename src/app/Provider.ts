export class Provider {

  public id: string;
  public country: string;
  public provider_id: number;
  public url: string;

  constructor( country:string, id:string, provider_id:number, url:string) {
    this.country = country;
    this.id = id;
    this.provider_id = provider_id;
    this.url = url;
  }

}
