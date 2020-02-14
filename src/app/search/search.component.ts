import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Movie } from '../Movie';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  movies = new Array<Movie>();
  searchQuery = "";
  constructor(private _searchService: SearchService, private route: ActivatedRoute,private router: Router) { }

  search(query: string){
    this._searchService.searchMovies(query).subscribe(response =>
    {
      this.movies = response.map(item =>
      {
        return new Movie(
          item.MovieName,
          item.Year,
          item.id,
          item.slug,
          item.poster
        );
      });
    });
  }
  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.searchQuery = params['query'];
        this.search(params['query']);
      });
  }
}
