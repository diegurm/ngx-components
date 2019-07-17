import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRlc2Vudm9sdmltZW50b0BhZHNvZnQuY29tLmJyIiwibmFtZWlkIjoiZGVzZW52b2x2aW1lbnRvQGFkc29mdC5jb20uYnIiLCJlbWFpbCI6WyJkZXNlbnZvbHZpbWVudG9AYWRzb2Z0LmNvbS5iciIsImRlc2Vudm9sdmltZW50b0BhZHNvZnQuY29tLmJyIl0sInN1YiI6ImRlc2Vudm9sdmltZW50b0BhZHNvZnQuY29tLmJyIiwicm9sZSI6ImFkbWluIiwiQWNlc3NvRmlsaWFpcyI6IjEsMTYsMTcsMjAsMjEsMjYsMzYsMzciLCJDb250cmF0b0ZpbGlhaXMiOiIzNiwzNyIsIlBlcmZpbElkIjoiOSIsIlVzdWFyaW9JZCI6IjUxIiwiRmlsaWFsSWQiOiIzNiIsIk1hdHJpeklkIjoiMzYiLCJPY2lvc2lkYWRlIjoiNjAiLCJGaWxpYWxVZiI6IkJBIiwiTGljZW5jYUlkIjoiN2I2ZDlhNjktZWQ4MS00ZGE3LTkxYjMtZWJkOWViMGZkZDc1IiwiQ29tcGFydGlsaGFtZW50byI6IiIsIm5iZiI6MTU2MzM4NDQ1OCwiZXhwIjoxNTYzNDEzMjU4LCJpYXQiOjE1NjMzODQ0NTgsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjAyMC8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjIwMjAvIn0.NpSGBLBlGN9QlO1JqXq45Z8Tue_x3jpzwEkcGWNtQXk';
const API_URL = 'https://erp-api-test.adsoft.com.br/api/v1/consulta/produto/produtograde';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getProdutos(searchText): Observable<any[]> {
    let select = 'descricaoCompleta,descricao,codigo,unidadeComercial,ean,lote,fracionavel,codigoAuxiliar,descricaoGrupo,id';
    let expand = 'estProdutoImposto($expand=estoqueEstArmazem,fisModelotributacao($expand=fisModelotributacaoIcms)),estProduto($expand=estProdutoGrupo),estProdutoGrade';
    let orderby = 'codigo';

    return this.http.get<any[]>(`${API_URL}?$orderby=${orderby}&$select=${select}&$expand=${expand}&$filter=${this.getFiltro(searchText)}`, {
      headers: {
        Authorization: 'Bearer ' + TOKEN
      }
    });
  }


  getFiltro(searchText) {
    return `permiteVenda eq true and (contains(descricaoCompleta,'${searchText}') or contains(ean,'${searchText}') or contains(codigoAuxiliar,'${searchText}') or contains(codigo,'${searchText}'))`
  }

}
