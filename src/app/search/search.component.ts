import { Component, OnInit, Directive, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import { SearchService } from '../search.service';
import { Movie } from '../Movie';
import { Provider } from '../Provider';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  movies = new Array<Movie>();
  providers = new Array<Provider>();
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
          item.poster,
          item.imdb
        );
      });
      var movie_html = document.getElementById("movies");
      movie_html.innerHTML = ``;
      if(this.movies.length==0){
        movie_html.innerHTML = '<div class="twelve card columns"><div class="movie-info"><div class="twelve columns"><p>No match found.<br>Check the spelling or type IMDB Movie Name</p><a href="mailto:flickzeemovies@gmail.com?subject=I%20Found%20zssdasd" title="Found it">Found it? <br> Let everyone know !</a></div></div></div>'
      }
      for (var i = 0; i < this.movies.length; i++){
        var movie = this.movies[i];
        movie_html.innerHTML += `<div class="row"><div class="twelve card columns">
          <h2><a href='https://www.flickzee.com/full-movie/`+movie.slug+`-watch-online-`+movie.id+`'>`+movie.MovieName+` (`+movie.Year+`)</a></h2>
          <div class="movie-info">
            <div class="five columns">
              <a href='https://www.flickzee.com/full-movie/`+movie.slug+`-watch-online-`+movie.id+`' title=`+movie.MovieName+`>
                <img class="movie-img" src="https://www.flickzee.com/assets/movieimages/movie-id-`+movie.id+`.jpeg" onerror="this.onerror=null; this.src='https://www.flickzee.com/images/missing.png'" alt="`+movie.MovieName+` Watch Online">
              </a>
            </div>
            <div class="seven columns"  id="`+movie.imdb+`Provider">`
        this.getProviders(movie);
      }
      movie_html.innerHTML += `</div></div></div></div>`
    });
  }
  async getProviders(movie: Movie){
    await this._searchService.getProviders(movie.id.toString(),'IN').toPromise().then(response =>
    {
      this.providers = response.map(item =>
      {
        return new Provider(
          item.country,
          item.id,
          item.provider_id,
          item.url
        );
      });
    });
    var provider_html = document.getElementById(movie.imdb+"Provider");
    if(this.providers.length>0){
      provider_html.innerHTML += `<span class="twelve columns avail-on">Watch Online</span><div>`
      for(var j=0;j<this.providers.length;j++){
          if(j==8)
            break;
          var provider = this.providers[j];
          provider_html.innerHTML += `<div class="two columns icon-container box"><a href='`+provider.url+`'><img class="showpointer icon-class wtwtrigger" src='assets/images/`+provider.provider_id+`.png' onerror="this.src='assets/images/na.png'; name=this.parentNode.href.split('.')[1]; this.parentNode.innerHTML+='<div class=ptext ><p>'+name+'</p></div>';"></a></div>`;
      }
      if(this.providers.length>8){
          var more = this.providers.length-8;
          provider_html.innerHTML += `<div class="two columns icon-container box"><a href='https://www.flickzee.com/full-movie/`+movie.slug+`-watch-online-`+movie.id+`' ><img class="showpointer icon-class wtwtrigger" src='assets/images/more.png'"><div class="text"><p>+`+more+` more</p></div></a></div>`;
      }
    }
    else{
      provider_html.innerHTML += `<div class="seven columns">
                          <p>As far as we know, this movie/tv series is not Available anywhere online.</p><p>
                <a href="mailto:flickzeemovies@gmail.com?subject=I Found Unns: Love... Forever" title="Found it">Found it? <br> Let everyone know !</a>
                      </p></div>`
    }
  }

  val_backup = '';
  autocomplete(inp) {
    var currentFocus;
    var self = this;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        self.val_backup = this.value;
        closeAllLists(null);

        if (!val) { return false;}
        if(val.length<=3)
          return;
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        self._searchService.searchMovies(val).subscribe(response =>
        {
          response.map(item =>
          {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + item.MovieName + "</strong>";
            b.innerHTML += "("+item.Year+")";
            b.innerHTML += `<input type='hidden' value='https://www.flickzee.com/full-movie/`+item.slug+`-watch-online-`+item.id+`'>`;
            b.innerHTML += `<input type='hidden' value='`+item.MovieName+`'>`;
            b.addEventListener("click", function(e) {
              window.open(this.getElementsByTagName("input")[0].value,'_self');
              //location.replace(this.getElementsByTagName("input")[0].value);
              //inp.value = this.getElementsByTagName("input")[1].value;
              // closeAllLists(null);
            });
            a.appendChild(b);
          });
        });
    });

    inp.addEventListener("keydown", function(e) {
        var y = <HTMLDivElement>document.getElementById(this.id + "autocomplete-list");
        if (y) var x = y.getElementsByTagName("div");
        if (e.keyCode == 40) {//Down
          event.preventDefault();
          currentFocus++;
          addActive(x);
          if(currentFocus==-1)
            inp.value = self.val_backup;
          else
            inp.value = x[currentFocus].getElementsByTagName("input")[1].value;
        } else if (e.keyCode == 38) { //up
          event.preventDefault();
          currentFocus--;
          addActive(x);
          if(currentFocus==-1)
            inp.value = self.val_backup;
          else
            inp.value = x[currentFocus].getElementsByTagName("input")[1].value;
        } else if (e.keyCode == 13) {
          event.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = -1;
      if (currentFocus < -1) currentFocus = (x.length - 1);
      if (currentFocus!=-1)
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }
  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.searchQuery = params['q'];
        this.search(params['q']);
      });
    this.autocomplete(document.getElementById("searchTerm"));
  }

}
