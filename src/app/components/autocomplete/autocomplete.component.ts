import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap, catchError } from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';
import { AutoComplete } from '../component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatAutocompleteSelectedEvent } from '@angular/material';

const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Component({
  selector: 'auto-complete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteComponent extends AutoComplete implements OnInit {

  public $itens: Observable<string[]>;

  public isLoading = false;
  public searchFailed = false;
  public selectedItem: any = null;
  public toHighlight = '';

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
    super();
  }

  ngOnInit() {
    this.$itens = this.control.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(searchText => this._filter(searchText.trim())),
        tap(() => this.isLoading = false)
      );
  }

  private _filter(searchText: any): Observable<string[]> {
    this.toHighlight = searchText;

    if (searchText === '') {
      return of([]);
    }

    return this.apiService.getProdutos(searchText)
      .pipe(
        tap(() => this.searchFailed = false),
        catchError((err) => {
          console.log(err);
          this.searchFailed = true;
          return of([]);
        })
      );

    /*
    return this.http.get<any>(WIKI_URL, { params: PARAMS.set('search', searchText) })
      .pipe(
        map(response => response[1]),
        tap(() => this.searchFailed = false),
        catchError(() => {
          this.searchFailed = true;
          return of([]);
        })
      );
      */
  }

  displayWithFn(data?: any): string | undefined {
    return data ? data.descricaoCompleta : undefined;
  }

  selectedOption(event: MatAutocompleteSelectedEvent): void {
    this.selectedItem = event.option.value;
  }

  removeSeletedItem(): void {
    this.control.setValue('');
    this.selectedItem = null;
    // this.$itens = of([]);
  }
}

import { PipeTransform, Pipe } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: string, search): string {
    const pattern = search
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .split(' ')
      .filter(t => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');

    return search ? text.replace(regex, match => `<b>${match}</b>`) : text;
  }
}
