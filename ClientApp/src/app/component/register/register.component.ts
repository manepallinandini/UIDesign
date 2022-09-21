import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { IUser } from '../../shared/iuser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegister: FormGroup | any;
/*  baseUrl: string = "http://capstoneregister.com";*/

  user: IUser | any;
  public Status: boolean | any;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router,
    private http: HttpClient, @Inject('BASE_URL') private baseUrl: string
  ) { }

  ngOnInit(): void {
    this.userRegister = this.fb.group({
      username: [''],
      email: [''],
      phone: [''],
      password: [''],
      appcode: 'JAMESBOND'
    });
  }



  onRegister(): void {

    this.http.post<string>(this.baseUrl + 'home/register', this.userRegister.value).subscribe((r) => { this.Status = r; console.log(r); });
    /*    this.http.post<string>("http://capstoneregister.com/Auth/register", this.userRegister.value).subscribe((r) => { console.log(r); });*/

/*      this.api.postregister(this.userRegister.value).subscribe({
        next: (result: any) => {
          this.userRegister.reset();
        }
      })
    
  */

    alert("Registration Successful. Re-directing to Login Page for login......!")
    this.api.username.next(this.userRegister.get('username').value);
    this.router.navigate(['/login']);
    console.log(this.userRegister.value)
    }

    

  /*this.user = { username: null,email:null,phone:null, password: null };*/


  /*  mapFormValuesToModel() {
      this.user.username = this.userRegister.get('username').value;
      this.user.email = this.userRegister.get('email').value;
      this.user.phone = this.userRegister.get('phone').value;
      this.user.password = this.userRegister.get('password').value;
    }*/



  /*    if (this.userRegister.valid) {
        this.api.postregister(this.userRegister.value).subscribe({
          next: (result: any) => {
            this.userRegister.reset();
          },
          error: () => {
            alert("Error while adding")
          }
        })*/


  /*    this.mapFormValuesToModel();
      console.log(this.user);
      this.http.post<string>(this.baseUrl + 'Home/CreateUsers', this.user, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(result => {
        this.Status = JSON.parse(result);
        console.log('[Home-Controller-(CreateUsers-ActionMethod)]>> returned Value--> ' + this.Status);
      }, error => console.error(error)
  );*/
  /*    alert("Registration Successful. Re-directing to Login Page for login......!")
      this.api.username.next(this.userRegister.get('username').value);
      this.router.navigate(['/products']);
      console.log(this.userRegister.value)*/
}
