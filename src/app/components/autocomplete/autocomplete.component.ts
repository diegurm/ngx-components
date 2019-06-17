import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AutoComplete} from '../component';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'auto-complete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteComponent extends AutoComplete implements OnInit {
  isLoading: boolean = false;
  $itens: Observable<any[]>;

  constructor(
    private _http: HttpClient
  ) {
    super();
  }

  ngOnInit() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRpZWdvQGFkc29mdC5jb20uYnIiLCJuYW1laWQiOiJkaWVnb0BhZHNvZnQuY29tLmJyIiwiZW1haWwiOlsiZGllZ29AYWRzb2Z0LmNvbS5iciIsImRpZWdvQGFkc29mdC5jb20uYnIiXSwic3ViIjoiZGllZ29AYWRzb2Z0LmNvbS5iciIsInJvbGUiOiJhZG1pbiIsIkFjZXNzb0ZpbGlhaXMiOiIxNiwyMCwzNiIsIkNvbnRyYXRvRmlsaWFpcyI6IjM2LDM3IiwiUGVyZmlsSWQiOiI5IiwiVXN1YXJpb0lkIjoiMTIiLCJGaWxpYWxJZCI6IjM2IiwiTWF0cml6SWQiOiIzNiIsIk9jaW9zaWRhZGUiOiI2MCIsIkZpbGlhbFVmIjoiQkEiLCJMaWNlbmNhSWQiOiI3YjZkOWE2OS1lZDgxLTRkYTctOTFiMy1lYmQ5ZWIwZmRkNzUiLCJDb21wYXJ0aWxoYW1lbnRvIjoiIiwibmJmIjoxNTYwODAzMDc4LCJleHAiOjE1NjA4MzE4NzgsImlhdCI6MTU2MDgwMzA3OCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoyMDIwLyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAyMC8ifQ.nmRVKi54xBzP4iAvbhxV0f9L_O2ozW32Bej-W9rRdoM');

    this.$itens = this.control.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(searchText => {
          return this._http.get<any>(`https://erp-api-test.adsoft.com.br/api/v1/consulta/produto/produtograde?$orderby=codigo&$select=descricaoCompleta,descricao,codigo,unidadeComercial,ean,lote,fracionavel,codigoAuxiliar,descricaoGrupo,id&$filter=permiteVenda%20eq%20true%20and%20(contains(descricaoCompleta,%27MAQUINA%27)%20or%20contains(ean,%27MAQUINA%27)%20or%20contains(codigoAuxiliar,%27MAQUINA%27)%20or%20contains(codigo,%27MAQUINA%27))&$expand=estProdutoImposto($expand=estoqueEstArmazem,fisModelotributacao($expand=fisModelotributacaoIcms)),estProduto($expand=estProdutoGrupo),estProdutoGrade`, {
            headers: headers
          });
        })
      );
  }

}
