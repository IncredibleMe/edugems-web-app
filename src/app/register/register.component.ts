import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm : FormGroup;

  constructor(public router: Router, private api: ApiService, private el: ElementRef) {
  constructor(private fb: FormBuilder, public router: Router, private api: ApiService) {
  }

  ngOnInit() {
    this.buildForm();
  }

   buildForm():void {
    this.regForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password2: [null, [Validators.required]],
      email: [null, [Validators.required]],
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],

    });
     this.regForm.valueChanges
       .subscribe(data => this.onValueChanged(data));
     this.onValueChanged(); // (re)set validation messages now
  }


  register(form:any): void {
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

  onValueChanged(data?: any) {
    if (!this.regForm) { return; }
    const form = this.regForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': ''
  };

  validationMessages = {
    'name': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 4 characters long.',
      'maxlength':     'Name cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
  };

}
