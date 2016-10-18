import {Directive, AfterViewChecked} from "@angular/core";

declare var componentHandler: any;

@Directive({
  selector: '[mdl]'
})
export class MaterialDesignLiteDirective implements AfterViewChecked {

  constructor() {
  }

  ngAfterViewChecked() {
    if (componentHandler) {
      componentHandler.upgradeAllRegistered();
    }
  }


}
