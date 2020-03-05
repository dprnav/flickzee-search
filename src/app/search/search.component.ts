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
    });
  }

  getProviders(movie: Movie){
    this._searchService.getProviders(movie.imdb,'IN','flatrate','hd').subscribe(response =>
    {
      this.providers = response.map(item =>
      {
        return new Provider(
          item.country,
          item.imdb,
          item.provider_id,
          item.url,
          item.mtype,
          item.ptype,
          item.currency,
          item.price
        );
      });
    });
  }

  autocomplete(inp) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    var self = this;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists(null);
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        self._searchService.searchMovies(val).subscribe(response =>
        {
          response.map(item =>
          {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + item.MovieName + "</strong>";
            b.innerHTML += "("+item.Year+")";
            b.innerHTML += "<input type='hidden' value='" + item.MovieName + "'>";
            b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists(null);
            });
            a.appendChild(b);
          });
        });
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var y = <HTMLDivElement>document.getElementById(this.id + "autocomplete-list");
        if (y) var x = y.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }
  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.searchQuery = params['query'];
        this.search(params['query']);
      });
    this.autocomplete(document.getElementById("searchTerm"));
  }

}
