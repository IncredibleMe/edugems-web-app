/* tslint:disable:no-unused-variable */

import {RegisterComponent} from "./register.component";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {ElementRef} from "@angular/core";

describe('Component: Register', () => {
  it('should create an instance', () => {
    let router: Router;
    let api: ApiService;
    let el: ElementRef;
    let component = new RegisterComponent(router, api, el);
    expect(component).toBeTruthy();
  });
});
