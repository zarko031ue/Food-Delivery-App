import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { MenuService } from '../services/menu-service';
import { FoodModel } from '../models/food.model';
import { AuthService } from 'src/app/auth/singup/auth.service';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment'

const BACKEND_URL = environment.apiUrl + "/order";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  foodItems: FoodModel[] = [];
  total: number;
  message: string;
  orderDetail: any[];
  placeOrder = false;
  user: User;
  
  constructor(
    private cartService: CartService,
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.cartService.getFoodItems().subscribe((food: FoodModel[]) => {
      this.foodItems = food;
      this.cartTotal();
    });
    this.handleSubscription();
    this.authService.user.subscribe(user => this.user = user);
  }

  order(foodItems: FoodModel[]) {
    let orderDetailsObj = {};

    for (let key in foodItems) {
      const order: any = {
        [foodItems[key].id]: {
          userEmail: this.user.email,
          _id: foodItems[key].userId,
          name: foodItems[key].name,
          price: foodItems[key].price,
          qty: foodItems[key].qty,
          address: this.user.address,
          total: this.total,
        },
      };
      orderDetailsObj = {
        ...orderDetailsObj,
        [foodItems[key].id]: order[foodItems[key].id],
      };
    }

    let orderObj = {
      orderedItems: orderDetailsObj,
      orderTime: new Date().toLocaleString(),
    };

    this.http
      .post( BACKEND_URL, orderObj)
      .subscribe((res: any) => {
        this.message = res.message;
        this.placeOrder = true;
        var transformedObject = Object.keys(res.data.orderedItems).map(
          (key) => {
            return res.data.orderedItems[key];
          }
        );
        this.orderDetail = transformedObject;
        console.log(this.orderDetail);
      });
  }

  handleSubscription() {
    this.menuService.getMsg().subscribe(() => {
      this.loadCartItems();
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

  dec(postId: number) {
    this.cartService.decreaseQty(postId).subscribe(() => {
      const udpt = this.foodItems.filter((item) => {
        if (item.id === postId) {
          item.qty--;
          this.cartTotal();
        }
        if (item.qty < 1) {
          const updatedItems = this.foodItems.filter(
            (item) => item.id !== postId
          );
          this.foodItems = updatedItems;
        }
      });
      return udpt;
    });
  }

  toShopping() {
    this.router.navigate(['/food-delivery']);
  }
}
