import { AppService } from './app.service';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { LocalStorageModule } from 'angular-2-local-storage';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    BrowserTransferStateModule,
    LocalStorageModule.withConfig({
      storageType: 'localStorage',
    })
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
