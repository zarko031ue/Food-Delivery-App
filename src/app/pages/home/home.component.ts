import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from '../services/home.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  restaurants:any[];
  subscription : Subscription;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
  this.subscription = this.homeService.resturantsChanged
    .subscribe(
      (restaurants:any[]) =>{
        this.restaurants = restaurants;
      }
    )
    this.homeService.getRestaurants().subscribe();
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
