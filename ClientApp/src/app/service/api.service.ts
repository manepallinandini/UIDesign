import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'http://capstoneregister.com';

  constructor(private http: HttpClient, private router: Router) { }
  public isLogin: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public username: BehaviorSubject<string> = new BehaviorSubject<string>('');


  postregister(register: any) {
    return this.http.post<any>("http://capstoneregister.com/Auth/register", register)
  }

  postlogin(login: any) {
    return this.http.post<any>("http://localhost:5222/api/Login",login)
  }

/*  getProduct() {
    return this.http.get<any>("https://fakestoreapi.com/products")
      .pipe(map((res: any) => {
        return res;
      }))
  }*/

  getProduct() {
    return this.http.get<any>("http://localhost:5265/api/Product");
  }

  login(accessToken: string, AccessTokenExpirationDate: string, username: string) {
    console.log(this.isLogin.value);
    this.isLogin.next(true);
    localStorage.setItem('AccessToken', accessToken);
    localStorage.setItem('AccessTokenExpirationDate', AccessTokenExpirationDate);
    localStorage.setItem('UserName', username);
    this.username.next(username);
    console.log("LoggedIn Value : " + this.isLogin.value);
    this.router.navigate(['products']);
  }

  private hasToken(): boolean {
    return !localStorage.getItem('AccessToken');
  }

}
