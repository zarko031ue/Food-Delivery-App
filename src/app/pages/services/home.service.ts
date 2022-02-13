import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from '../../../environments/environment'

const BACKEND_URL = environment.apiUrl + "/restaurants";

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private http: HttpClient) {}

  resturantsChanged = new Subject<any[]>();

  restaurants: any[] = [];
 


 
  getRestaurants() {
    return this.http
      .get<{ message: string; restaurants: any[] }>(BACKEND_URL)
      .pipe(
        tap((postData) => {
          this.setRestaurants(postData.restaurants);
        })
      );
  }

  setRestaurants(restaurants: any[]) {
    this.restaurants = restaurants;
    this.resturantsChanged.next(this.restaurants.slice());
  }
}
