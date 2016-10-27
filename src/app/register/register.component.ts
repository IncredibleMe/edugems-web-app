import {Component, OnInit, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router, private api: ApiService, private el: ElementRef) {
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
        var snackbarContainer = this.el.nativeElement.querySelector("#toast_Error")
        var data = {
          message: error.json().error,
          timeout: 3000
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
      });
  }

}
