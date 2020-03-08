export class Movie {

  public MovieName: string;
  public Year: number;
  public id: number;
  public slug: string;
  public poster: string;
  public imdb: string;

  constructor( MovieName:string, Year:number, id:number, slug:string, poster:string, imdb:string) {
    this.MovieName = MovieName;
    this.Year = Year;
    this.id = id;
    this.slug = slug;
    this.poster = poster;
    this.imdb = imdb;
  }

}
