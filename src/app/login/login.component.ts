import {Component, OnInit, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

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

}
