import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-apollo-compoments';

  config = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
    },
    {
      type: 'select',
      label: 'Favourite food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
    },
  ];

  form: FormGroup;

  origemMercadoria: any[] = [
    { value: '0', description: 'Nacional' },
    { value: '1', description: 'Estrangeira - Importação Direta' },
    { value: '2', description: 'Estrangeira - Adquirida no mercado interno' },
    { value: '3', description: 'Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%' },
    { value: '4', description: 'Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes' },
    { value: '5', description: 'Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%; ' },
    { value: '6', description: 'Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX e gás natural;' },
    { value: '7', description: 'Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista da CAMEX e gás natural' },
    { value: '8', description: 'Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%' }
  ];

  constructor(
    fb: FormBuilder
  ) {
    this.form = fb.group({
      dropdownList: ['', Validators.required],
      autocomplete: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }
}
