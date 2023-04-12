import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { ActivityModule } from './activity/activity.module';
import { AuthModule } from './auth/auth.module';
import { MenuBarComponent } from './core/components/menu/menu-bar/menu-bar.component';
import { MenuItemComponent } from './core/components/menu/menu-item/menu-item.component';
import { ActivityFormComponent } from './activity/components/activity-form/activity-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    MenuItemComponent,
    ActivityFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    ActivityModule,
    AuthModule
],
providers : [
  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
