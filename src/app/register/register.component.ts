import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router, private api: ApiService) {
  }

  ngOnInit() {
  }

  register(form: any): void {
    console.log('Form Data: ');
    console.log(form);
    this.api.register(form).subscribe(
      (result) => {
        if (result) {
          this.router.navigate(['login']);
        }
      },
      error => {
        console.log(error.text());
      });
  }

}
