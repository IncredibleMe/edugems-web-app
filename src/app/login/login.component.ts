import {Component, OnInit, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  login: boolean = true;

  constructor(private router: Router, private api: ApiService, private el: ElementRef) {
  }

  ngOnInit() {
  }

  submitForm(form: any): void {
    console.log('Form Data: ');
    console.log(form);
    this.api.login(form).subscribe((result) => {
        if (result) {
          this.router.navigate(['myprofile']);
        }
      },
      error => {
        var snackbarContainer = this.el.nativeElement.querySelector("#toast_Error")
        var data = {
          message: error.json().message,
          timeout: 3000
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
      });
  }

  forgot_password(form: any): void {
    console.log(form);
    this.api.forgot_password(form).subscribe((result) => {
        if (result) {
          this.login = true;
          var snackbarContainer = this.el.nativeElement.querySelector("#toast_Error")
          var data = {
            message: result.message + 'Ο κωδικός σου άλλαξε. Δες τα mail σου.',
            timeout: 3000
          };
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
      },
      error => {
        var snackbarContainer = this.el.nativeElement.querySelector("#toast_Error")
        var data = {
          message: error.json().message,
          timeout: 3000
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
      });
  }
}
