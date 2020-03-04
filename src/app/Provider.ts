export class Provider {

  public imdb: string;
  public country: string;
  public provider_id: number;
  public url: string;
  public mtype: string;
  public ptype: string;
  public currency: string;
  public price: number;

  constructor( country:string, imdb:string, provider_id:number, url:string, mtype:string, ptype:string, currency:string, price:number) {
    this.country = country;
    this.imdb = imdb;
    this.provider_id = provider_id;
    this.url = url;
    this.mtype = mtype;
    this.ptype = ptype;
    this.currency = currency;
    this.price = price;
  }

}
