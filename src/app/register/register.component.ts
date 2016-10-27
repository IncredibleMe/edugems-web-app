import {Component, OnInit, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm:FormGroup;

  constructor(private fb:FormBuilder, public router: Router, private api: ApiService, private el: ElementRef) {
    this.regForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'username' : '',
      'password': '',
      'email' : '',
      'name' : '',
      'surname' : ''
    })
  }

  ngOnInit() {
    this.buildForm();
  }


  register(form: any): void {
    console.log('Form Data: ');
    console.log(this.regForm.value);
    this.api.register(this.regForm.value).subscribe(
      (result) => {
        if (result) {
          this.router.navigate(['login']);
        }
      },
      error => {
        //pjvar snackbarContainer = this.el.nativeElement.querySelector("#toast_Error")
        var data = {
          message: error.json().error,
          timeout: 3000
        };
        //snackbarContainer.MaterialSnackbar.showSnackbar(data);
      });
  }

  buildForm(): void {
    this.regForm = this.fb.group({
      'username': [null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      'password': [null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      'email': [null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      'name': [null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      'surname': [null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],

    });
    this.regForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
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
        console.log(messages);
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'username': '',
    'password': '',
    'email': '',
    'name': '',
    'surname': ''
  };

  validationMessages = {
    'username': {
      'required': 'username is required.',
      'minlength': 'Userame must be at least 4 characters long.',
      'maxlength': 'Username cannot be more than 24 characters long.',
    },
    'password': {
      'required': 'password is required.',
      'minlength': 'Userame must be at least 4 characters long.',
      'maxlength': 'Username cannot be more than 24 characters long.',
    },
    'email': {
      'required': 'email is required.',
      'minlength': 'Userame must be at least 4 characters long.',
      'maxlength': 'Username cannot be more than 24 characters long.',
    },
    'name': {
      'required': 'name is required.',
      'minlength': 'Userame must be at least 4 characters long.',
      'maxlength': 'Username cannot be more than 24 characters long.',
    },
    'surname': {
      'required': 'surname is required.',
      'minlength': 'Userame must be at least 4 characters long.',
      'maxlength': 'Username cannot be more than 24 characters long.',
    },

  };

}
