import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CartService } from "../services/cart.service";


@Injectable({providedIn:'root'})
export class CartResolver implements Resolve<any>{
    constructor(private cartService: CartService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.cartService.deleteAll();
            
    }
}