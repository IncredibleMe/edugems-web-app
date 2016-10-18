/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

describe('Component: Register', () => {
  it('should create an instance', () => {
    let router: Router;
    let api: ApiService;
    let component = new RegisterComponent(router, api);
    expect(component).toBeTruthy();
  });
});
