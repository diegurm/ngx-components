
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { AutocompleteComponent, HighlightPipe } from './components/autocomplete/autocomplete.component';
import { DropdownListComponent } from './components/dropdown-list/dropdown-list.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicFormModule
  ],
  declarations: [
    AppComponent,
    HighlightPipe,
    AutocompleteComponent,
    DropdownListComponent,
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
