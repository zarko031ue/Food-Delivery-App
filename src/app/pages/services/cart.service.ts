import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { FoodModel } from '../models/food.model';

import { environment } from '../../../environments/environment'

const BACKEND_URL = environment.apiUrl + "/cart/";

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) {}

  getFoodItems() {
    return this.http
      .get<{ food: FoodModel[] }>(BACKEND_URL)
      .pipe(
        map((result) => {
          let items = result.food;
          let cartItems: FoodModel[] = [];

          for (let item of items) {
            let exist = false;

            for (let i in cartItems) {
              if (cartItems[i].id === item.id) {
                cartItems[i].qty++;
                exist = true;
                break;
              }
            }

            if (!exist) {
              cartItems.push(
                new FoodModel(
                  item.id,
                  item.resName,
                  item.name,
                  item.img,
                  item.price,
                  item.qty,
                  item.userId,
                )
              );
            }
          }

          return cartItems;
        })
      );
  }

  addFoodToCart(food: FoodModel) {
    return this.http.post(BACKEND_URL, food);
  }

  deleteAll() {
    return this.http.delete(BACKEND_URL);
  }

  decreaseQty(itemId: number) {
    return this.http.delete(BACKEND_URL + itemId);
  }
}
