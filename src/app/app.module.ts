import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {MaterialDesignLiteDirective} from "./material-design-lite.directive";
import {RegisterComponent} from "./register/register.component";
import {TopbarComponent} from "./topbar/topbar.component";
import {HomeComponent} from "./home/home.component";
import {RouterModule} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {LoggedInGuard} from "./logged-in.guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ApiService} from "./api.service";
import {ReCaptchaModule} from "angular2-recaptcha";
import {PasswordStrengthComponent} from "./register/password-strength/password-strength.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MaterialDesignLiteDirective,
    RegisterComponent,
    TopbarComponent,
    HomeComponent,
    ProfileComponent,
    PageNotFoundComponent,
    PasswordStrengthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'myprofile', component: ProfileComponent, canActivate: [LoggedInGuard]},
      {path: '', component: HomeComponent},
      {path: '**', component: PageNotFoundComponent}
    ]),
    ReactiveFormsModule,
    ReCaptchaModule
  ],
  providers: [ApiService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
