import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { httpInterceptorProviders } from './interceptors';
import * as fr from '@angular/common/locales/fr';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { TestComponent } from './components/test/test.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    ErrorPageComponent,
    MessageBoxComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    MessageBoxComponent
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
