import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStateSub : Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authStateSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }
  
  onSubmit(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.address, form.value.name)
}

ngOnDestroy() {
    this.authStateSub.unsubscribe();
}




}