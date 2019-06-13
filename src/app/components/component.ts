export enum EnumControlType {
  TTextEdit = 'TextEdit',
  TCurrencyEdit = 'CurrencyEdit',
  TPercentEdit = 'PercentEdit',
}

export class TComponent {
  name: string;
  label: string;
  controlType: EnumControlType;
}

export class TextEdit {}
export class CurrencyEdit {}
export class PercentEdit {}
export class MaskedEdit {} // phone/cep/cpf/cnpj
export class NumberEdit {} //
export class Radiogroup {}
export class TCheckbox {}
export class Datepicker {}
export class TextArea {}
export class Switch {}
export class ComboBox {} // api
export class ComboBoxTreeview {} // api
export class DropDownList {} // array
export class AutoComplete {} // async api
export class MultiSelect {} // user input

