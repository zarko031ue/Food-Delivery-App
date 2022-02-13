import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { HeaderComponent } from './shared-pages/header/header.component';
import { FooterComponent } from './shared-pages/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { SingupComponent } from './auth/singup/singup.component';
import { CheckoutComponent } from './pages/checkout/checkout.component'
import { LoadingSpinnerComponent } from './shared-pages/loading-spinner/loading-spinner.component';
import { ErrorInterceptor } from './error-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './auth/singup/auth-interceptor';
import { MapComponent } from './pages/checkout/my-map/map';
import { MatDialogModule} from '@angular/material/dialog'
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SingupComponent,
    CheckoutComponent,
    LoadingSpinnerComponent,
    MapComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
