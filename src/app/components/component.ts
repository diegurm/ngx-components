import { FormControl } from '@angular/forms';
import { Input } from '@angular/core';

export enum EnumControlType {
  TTextEdit = 'TextEdit',
  TCurrencyEdit = 'CurrencyEdit',
  TPercentEdit = 'PercentEdit',
  TDropDownList = 'DropDownList',
}

export abstract class ComponentAbstract {
  type: EnumControlType;
  @Input()
  label: string;
  @Input()
  placeholder: string;
  @Input()
  control: FormControl;
  @Input()
  required: boolean;
}

export class TextEdit {
}

export class CurrencyEdit {
}

export class PercentEdit {
}

export class MaskedEdit {
} // phone/cep/cpf/cnpj
export class NumberEdit {
} //
export class Radiogroup {
}

export class TCheckbox {
}

export class Datepicker {
}

export class TextArea {
}

export class Switch {
}

export class ComboBox {
} // api
export class ComboBoxTreeview {
} // api

// array
export abstract class DropDownList extends ComponentAbstract {
  @Input()
  options: any[];
}

export class AutoComplete extends ComponentAbstract {
  @Input()
  options: any[];
} // async api
export class MultiSelect {
} // user input

