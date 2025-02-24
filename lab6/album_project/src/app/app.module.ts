import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
// ... other imports

@NgModule({
  declarations: [
    AppComponent,
    // ... components
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    // ... other modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 