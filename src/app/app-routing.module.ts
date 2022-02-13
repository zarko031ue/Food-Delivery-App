import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/singup/auth.gard';
import { SingupComponent } from './auth/singup/singup.component';
import { CartResolver } from './pages/checkout/checkout-resolve.service';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuResolverService } from './pages/menu/menu-resolver.service';
import { MenuComponent } from './pages/menu/menu.component';



const routes: Routes = [
  {path: '', redirectTo: 'food-delivery', pathMatch: 'full'},
  {path: 'food-delivery', component: HomeComponent, resolve: [CartResolver]},
  {path: 'food-delivery/:id', component: MenuComponent, resolve: [MenuResolverService]},
  {path: 'cart', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'singup', component: SingupComponent},
  
];

const routerOption: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOption)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
