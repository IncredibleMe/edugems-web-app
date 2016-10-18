/* tslint:disable:no-unused-variable */

import {TopbarComponent} from "./topbar.component";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";

describe('Component: Topbar', () => {
  it('should create an instance', () => {
    let router: Router;
    let api: ApiService;
    let component = new TopbarComponent(router, api);
    expect(component).toBeTruthy();
  });
});
