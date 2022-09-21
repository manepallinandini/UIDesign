import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{

  public totalItem: number = 0;
  public searchTerm !: string;

  isExpanded = false;
  isLoggedInCheck: Boolean = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(private api: ApiService) { }
  ngOnInit() {
    this.api.isLogin.subscribe((d) => { this.isLoggedInCheck = d; });
  }
}
