import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {ApiService} from "./api.service";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private api: ApiService) {
  }

  canActivate() {
    return this.api.isLoggedIn();
  }
}
