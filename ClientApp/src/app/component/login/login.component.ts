import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { IUser } from '../../shared/iuser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  user: IUser | any;
  accessToken: string | any;
  retVal: string = '';


  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.baseUrl);
    const username = this.activatedroute.snapshot.paramMap.get('username');

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.user = { username: username ? username : null, password: null };

    this.loginForm.patchValue({
      username: username ? username : '',
      password: ''
    });
    this.accessToken = '';
  }


  mapFormValuesToModel() {
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
  }


  onLoginClick() {
    console.log(this.loginForm.value);

    this.mapFormValuesToModel();
    console.log(this.user);

    console.log(this.baseUrl + 'Home/LoginUser');

    this.http.post<string>(this.baseUrl + 'Home/LoginUser', this.user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(result => {
      console.log(result);

      this.retVal = result;
      if (result != null) {

        this.accessToken = JSON.stringify(result[0]);

        console.log(this.accessToken);
        console.log(JSON.stringify(result[1]));
        console.log(JSON.stringify(result[2]));

        this.api.login(this.accessToken, JSON.stringify(result[1]), this.user.username);

      }
    }, error => console.log(error));

          /*this.http.get<any>("http://localhost:5222/api/Register").subscribe(res => {
            const user = res.find((a: any) => {
              return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
    
            })
            if (user) {
              alert("Loggig in ");
              this.api.username.next(this.loginForm.get('username').value);
              this.api.isLogin.next(true);
              this.loginForm.reset();
    
              this.router.navigate(['products']);
            }
            else {
              alert("Wrong credentials");
            }
          }, err => {
            alert("Servr error")
          })*/

  }



  /*if (this.loginForm.valid) {
    this.api.postlogin(this.loginForm.value).subscribe({
      next: (result: any) => {
        this.loginForm.reset();
  
      },
      error: () => {
        alert("Error while adding")
      }
    })
  }
  alert("Login Successful")
  this.api.username.next(this.loginForm.get('username').value);
  this.api.isLogin.next(true);
  this.router.navigate(['products']);
  console.log(this.loginForm.value);*/
}
