import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from 'src/app/pages/models/user.model';
import { CartService } from 'src/app/pages/services/cart.service';

import { AuthData, Login } from '../../pages/models/auth-data.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  public email: string;
  public address: string; 
  user = new BehaviorSubject<User>(null)

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  
  createUser(email: string, password: string, address: string, name: string) {
    const authData: AuthData = { email: email, password: password, address: address, name: name };
    this.http
      .post('http://localhost:3000/api/user/singup', authData)
      .pipe(
        catchError(() => {
          return throwError(() => {
            this.authStatusListener.next(false);
          });
        })
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  login(email: string, password: string) {
    const authData: Login = { email: email, password: password};
    this.http
      .post<{ token: string; expiresIn: number, email: string, address: string, name: string}>(
        'http://localhost:3000/api/user/login',
        authData
      )
      .pipe(
        catchError(() => {
          return throwError(() => {
            this.authStatusListener.next(false);
          });
        }), tap(response => {
          this.handleUser(response.email, response.address, response.name)
        }) 
      )
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/food-delivery']);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.autoLoginUser();
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/food-delivery']);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.cartService.deleteAll();
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userData')
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }

  private handleUser(
    email: string,
    address: string,
    name: string
  ) {
    const user = new User(email, address, name);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  
  autoLoginUser() {
    const userData: {
      email: string;
      address: string;
      name: string;
    } = JSON.parse(localStorage.getItem('userData')); 
    if (!userData) {
  
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.address,
      userData.name
    );
      this.user.next(loadedUser);
  }
  
}
