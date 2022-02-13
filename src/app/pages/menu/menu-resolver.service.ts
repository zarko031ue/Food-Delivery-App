import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { HomeService } from "../services/home.service";


@Injectable({providedIn: 'root'})
export class MenuResolverService implements Resolve<any>{
    constructor(private homeService: HomeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.homeService.getRestaurants();
    }
}