export class Movie {

  public MovieName: string;
  public Year: number;
  public id: number;
  public slug: string;
  public poster: string;

  constructor( MovieName:string, Year:number, id:number, slug:string, poster:string) {
    this.MovieName = MovieName;
    this.Year = Year;
    this.id = id;
    this.slug = slug;
    this.poster = poster;
  }

}
