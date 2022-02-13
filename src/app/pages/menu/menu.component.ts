import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FoodModel } from '../models/food.model';

import { AuthService } from 'src/app/auth/singup/auth.service';
import { CartService } from '../services/cart.service';
import { HomeService } from '../services/home.service';
import { MenuService } from '../services/menu-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  restaurants: any[];
  restaurantId: number;
  foodItems: FoodModel[] = [];
  total: number;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private menuService: MenuService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.restaurantId = +params['id'];
      if (this.restaurantId) {
        this.restaurants = this.homeService.restaurants.filter((value) => {
          return value.id == this.restaurantId;
        });
      }
    });
    this.handleSubscription();
    this.loadCartItems();

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  handleSubscription() {
    this.menuService.getMsg().subscribe(() => {
      this.loadCartItems();
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  toCart(food: FoodModel) {
    this.cartService.addFoodToCart(food).subscribe(() => {
      this.menuService.sendMsg(food);
    });
  }

  loadCartItems() {
    this.cartService.getFoodItems().subscribe((food: FoodModel[]) => {
      this.foodItems = food;
      this.cartTotal();
    });
  }

  cartTotal() {
    this.total = 0;
    this.foodItems.forEach((item) => {
      this.total += item.qty * item.price;
    });
  }

  inc(item: FoodModel) {
    this.cartService.addFoodToCart(item).subscribe(() => {
      this.menuService.sendMsg(item);
    });
  }

  dec(itemId: number) {
    this.cartService.decreaseQty(itemId).subscribe(() => {
      const updt = this.foodItems.filter((item) => {
        if (item.id === itemId) {
          item.qty--;
          this.cartTotal();
        }
        if (item.qty < 1) {
          const updatedItems = this.foodItems.filter(
            (item) => item.id !== itemId
          );
          this.foodItems = updatedItems;
        }
      });
      return updt;
    });
  }

  onCheckout() {
    this.router.navigate(['/cart']);
  }
}
