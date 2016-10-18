/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import {LoginComponent} from "./login.component";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";

describe('Component: Login', () => {
  it('should create an instance', () => {
    let router: Router;
    let api: ApiService;
    let component = new LoginComponent(router, api);
    expect(component).toBeTruthy();
  });
});
