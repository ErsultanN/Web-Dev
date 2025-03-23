import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MyShopComponent } from './my-shop/my-shop.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ServeComponent } from './serve/serve.component';
import { NewHeaderComponent } from './new-header/new-header.component';

@NgModule({
  declarations: [
    AppComponent,
    MyShopComponent,
    ProductListComponent,
    ProductItemComponent,
    ServeComponent,
    NewHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
