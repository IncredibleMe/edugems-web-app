import {Component, OnInit, ElementRef, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const emailValidator = Validators.pattern(".*@.*aua.gr|auth.gr|asfa.gr|aueb.gr|duth.gr|aeaa.gr|aeahk.gr|aeath.gr|aeavellas.gr|hua.gr|eap.gr|ihu.edu.gr|ionio.gr|uoa.gr|ntua.gr|panteion.gr|tuc.gr|aegean.gr|uoc.gr|uoi.gr|uom.gr|upatras.gr|uop.gr|unipi.gr|uth.gr|uowm.gr|teipir.gr|teithe.gr|aspete.gr|teiath.gr|teiste.gr|teiser.gr|teicrete.gr|teikav.edu.gr|teiep.gr|teiion.gr|teikal.gr|teilar.gr|teiwest.gr|teikoz.gr");

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,AfterViewInit {

  public regForm: FormGroup;
  public disableForm = false;

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

  ngAfterViewInit() {
    var recaptcha = this.el.nativeElement.querySelector("#myrecaptcha").firstChild;
    var innerchild = recaptcha.firstChild;
    recaptcha.setAttribute('style', 'width: 304px; height: 78px; margin-left:auto;margin-right: auto;');
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
      'email': [null, [Validators.required, emailValidator]],
      'name': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      'surname': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],

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
      'required': 'Είναι υποχρεωτικό.',
      'minlength': 'Πρέπει να είναι τουλάχιστον 4 χαρακτήρες.',
      'maxlength': 'Το μέγιστο είναι 24 χαρακτήρες.',
    },
    'password': {
      'required': 'Είναι υποχρεωτικό.',
      'minlength': 'Πρέπει να είναι τουλάχιστον 4 χαρακτήρες.',
      'maxlength': 'Το μέγιστο είναι 24 χαρακτήρες.',
    },
    'email': {
      'required': 'Είναι υποχρεωτικό.',
      'pattern': 'Το mail πρέπει να είναι ακαδημαικό, π.χ. icsd@aegean.gr',
    },
    'name': {
      'required': 'Είναι υποχρεωτικό.',
      'minlength': 'Πρέπει να είναι τουλάχιστον 3 χαρακτήρες.',
      'maxlength': 'Το μέγιστο είναι 24 χαρακτήρες.',
    },
    'surname': {
      'required': 'Είναι υποχρεωτικό.',
      'minlength': 'Πρέπει να είναι τουλάχιστον 3 χαρακτήρες.',
      'maxlength': 'Το μέγιστο είναι 24 χαρακτήρες.',
    },

  };

}
