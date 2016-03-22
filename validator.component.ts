/**
 * @fileoverview This validator component verifies text area and 
 * show up when there's an error;
 * 
 * To use this component,
 * - please import {ValidatorComponent}
 * - <text-validator [info]='testModel' model="password"></text-validator>
 * - directives: [ValidatorComponent]
 */
import {Component, Input} from 'angular2/core';

import {ValidatorService} from './validator.service';

@Component({
    selector: 'text-validator',
    template: `<TextView *ngIf="_empty()" [text]="_error"></TextView>`
})

export class ValidatorComponent {
  @Input() info: string;
  @Input() model: string;
  private _error: string;
  
  /**
   * This method will hide the validator component when there's no error
   */
  private _empty(): boolean {
    this._error = ValidatorService.check(this.model, this.info);
    if(typeof this._error !== 'undefined') {
      return true;
    }
    else {
      return false;
    }
  }
}
