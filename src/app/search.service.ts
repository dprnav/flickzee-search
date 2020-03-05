import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Movie } from './Movie';
import { Provider } from './Provider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _urlsearch: string = "http://35.154.244.92:5000/search?"
  private _urlprovider: string = "http://35.154.244.92:5000/providers?"
  constructor(private http: HttpClient) { }


  searchMovies(name: string): Observable<Movie[]>{
   let httpParams = new HttpParams().set('query', name);
   return this.http.get<Movie[]>(this._urlsearch+httpParams.toString());
  }
  getProviders(imdb: string,country: string,mtype: string,ptype: string): Observable<Provider[]>{
   let httpParams = "imdb="+imdb+"&country="+country+"&mtype="+mtype+"&ptype="+ptype;
   return this.http.get<Provider[]>(this._urlprovider+httpParams);
  }
}
