import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { httpInterceptorProviders } from './interceptors';
import * as fr from '@angular/common/locales/fr';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    MaterialModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    httpInterceptorProviders
  ]
})
export class CoreModule { 
  constructor(){
    registerLocaleData(fr.default);
  }
}
