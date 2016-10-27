/* tslint:disable:no-unused-variable */

import {LoginComponent} from "./login.component";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import {ElementRef} from "@angular/core";

describe('Component: Login', () => {
  it('should create an instance', () => {
    let router: Router;
    let api: ApiService;
    let el: ElementRef;
    let component = new LoginComponent(router, api, el);
    expect(component).toBeTruthy();
  });
});
