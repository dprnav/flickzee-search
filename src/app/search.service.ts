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
  getProviders(id: string,country: string): Observable<Provider[]>{
   let httpParams = "id="+id+"&country="+country;
   console.log(this._urlprovider+httpParams);
   return this.http.get<Provider[]>(this._urlprovider+httpParams);
  }
}
