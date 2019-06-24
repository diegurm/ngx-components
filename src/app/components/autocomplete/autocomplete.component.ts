import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {AutoComplete} from '../component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatAutocompleteSelectedEvent} from '@angular/material';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRlc2Vudm9sdmltZW50b0BhZHNvZnQuY29tLmJyIiwibmFtZWlkIjoiZGVzZW52b2x2aW1lbnRvQGFkc29mdC5jb20uYnIiLCJlbWFpbCI6WyJkZXNlbnZvbHZpbWVudG9AYWRzb2Z0LmNvbS5iciIsImRlc2Vudm9sdmltZW50b0BhZHNvZnQuY29tLmJyIl0sInN1YiI6ImRlc2Vudm9sdmltZW50b0BhZHNvZnQuY29tLmJyIiwicm9sZSI6ImFkbWluIiwiQWNlc3NvRmlsaWFpcyI6IjEsMTYsMTcsMjAsMjEsMjYsMzYsMzciLCJDb250cmF0b0ZpbGlhaXMiOiIzNiwzNyIsIlBlcmZpbElkIjoiOSIsIlVzdWFyaW9JZCI6IjUxIiwiRmlsaWFsSWQiOiIzNiIsIk1hdHJpeklkIjoiMzYiLCJPY2lvc2lkYWRlIjoiNjAiLCJGaWxpYWxVZiI6IkJBIiwiTGljZW5jYUlkIjoiN2I2ZDlhNjktZWQ4MS00ZGE3LTkxYjMtZWJkOWViMGZkZDc1IiwiQ29tcGFydGlsaGFtZW50byI6IiIsIm5iZiI6MTU2MTQxMDQ1NiwiZXhwIjoxNTYxNDM5MjU2LCJpYXQiOjE1NjE0MTA0NTYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAyMC8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjIwMjAvIn0.R2DVkvngsw7NNgf3LyGBAuT-kRrnGghSN3uuZYS-5-E';

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
          return searchText ? this._filter(searchText || '') : [];
        })
      ).subscribe((itens) => {
        this.itens = itens;
      });
  }

  private _filter(searchText: any): Observable<any[]> {
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
