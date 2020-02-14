import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Movie } from './Movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _url: string = "http://15.206.79.28:5000/search?"
  constructor(private http: HttpClient) { }


  searchMovies(name: string): Observable<Movie[]>{
   let httpParams = new HttpParams().set('query', name);
   return this.http.get<Movie[]>(this._url+httpParams.toString());
  }
}
