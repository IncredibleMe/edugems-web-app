import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  public logedin: Boolean;
  private subscription;

  constructor(private router: Router, private api: ApiService) {
    this.logedin = api.loggedIn;
    this.api = api;
  }

  ngOnInit() {
    this.subscription = this.api.getEmittedValue()
      .subscribe(item => this.logedin = item);
  }

  logout(event) {
    this.api.logout();
    this.router.navigate(['home']);
  }

  onUpdate(value) {
    this.logedin = value;
  }

}
