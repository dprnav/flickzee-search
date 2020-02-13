export class Movie {

  public MovieName: string;
  public Year: number;
  public IMDbRating: number;
  public IMDbVotes: number;
  public Awards: number;
  public Language: string;
  public AltText: string;

  constructor( MovieName:string, Year:number, IMDbRating:number, IMDbVotes:number, Awards:number, Language:string, AltText:string) {
    this.MovieName = MovieName;
    this.Year = Year;
    this.IMDbRating = IMDbRating;
    this.IMDbVotes = IMDbVotes;
    this.Awards = Awards;
    this.Language = Language;
    this.AltText = AltText;
  }

}
