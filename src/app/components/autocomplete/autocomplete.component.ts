import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {count, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {AutoComplete} from '../component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatAutocompleteSelectedEvent} from '@angular/material';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRlc2Vudm9sdmltZW50b0BhZHNvZnQuY29tLmJyIiwibmFtZWlkIjoiZGVzZW52b2x2aW1lbnRvQGFkc29mdC5jb20uYnIiLCJlbWFpbCI6WyJkZXNlbnZvbHZpbWVudG9AYWRzb2Z0LmNvbS5iciIsImRlc2Vudm9sdmltZW50b0BhZHNvZnQuY29tLmJyIl0sInN1YiI6ImRlc2Vudm9sdmltZW50b0BhZHNvZnQuY29tLmJyIiwicm9sZSI6ImFkbWluIiwiQWNlc3NvRmlsaWFpcyI6IjEsMTYsMTcsMjAsMjEsMjYsMzYsMzciLCJDb250cmF0b0ZpbGlhaXMiOiIzNiwzNyIsIlBlcmZpbElkIjoiOSIsIlVzdWFyaW9JZCI6IjUxIiwiRmlsaWFsSWQiOiIzNiIsIk1hdHJpeklkIjoiMzYiLCJPY2lvc2lkYWRlIjoiNjAiLCJGaWxpYWxVZiI6IkJBIiwiTGljZW5jYUlkIjoiN2I2ZDlhNjktZWQ4MS00ZGE3LTkxYjMtZWJkOWViMGZkZDc1IiwiQ29tcGFydGlsaGFtZW50byI6IiIsIm5iZiI6MTU2MTQ5NjgxNiwiZXhwIjoxNTYxNTI1NjE2LCJpYXQiOjE1NjE0OTY4MTYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAyMC8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjIwMjAvIn0.rzklckKoEn1_rYTwgEiFmIWvH3X2-91y9cZA7GXsTi8';

@Component({
  selector: 'auto-complete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteComponent extends AutoComplete implements OnInit, OnDestroy {

  private _subscription: Subscription;

  public isLoading: boolean = false;
  public itens: any[];
  public selectedItem: any = null;
  public toHighlight: string = '';

  constructor(
    private _http: HttpClient
  ) {
    super();
  }

  ngOnInit() {
    this._subscription = this.control.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(searchText => {
          return (searchText && this.selectedItem === null) ? this._filter(searchText || '') : [];
        })
      ).subscribe((itens) => {
        this.itens = itens;
      });
  }

  private _filter(searchText: any): Observable<any[]> {
    this.toHighlight = searchText;
    this.isLoading = true;
    return this._queryService(searchText)
      .pipe(
        map(response => {
          this.isLoading = false;
          return response;
        })
      );
  }

  private _queryService(searchText): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${TOKEN}`);

    return this._http.get<any>(`https://erp-api-test.adsoft.com.br/api/v1/consulta/produto/produtograde?$orderby=descricaoCompleta&$select=descricaoCompleta,descricao,codigo,unidadeComercial,ean,lote,fracionavel,codigoAuxiliar,descricaoGrupo,id&$filter=permiteVenda%20eq%20true%20and%20(contains(descricaoCompleta,%27${searchText}%27)%20or%20contains(ean,%27${searchText}%27)%20or%20contains(codigoAuxiliar,%27${searchText}%27)%20or%20contains(codigo,%27${searchText}%27))&$expand=estProdutoImposto($expand=estoqueEstArmazem,fisModelotributacao($expand=fisModelotributacaoIcms)),estProduto($expand=estProdutoGrupo),estProdutoGrade`, {
      headers: headers
    });
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
    this.itens = [];
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}

import { PipeTransform, Pipe } from '@angular/core';

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
