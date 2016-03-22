/**
 * @fileoverview This service provides text validators for
 * confirmation code, email, name, password and phone
 */

export class ValidatorService {
  
  /**
   * This method checks the text area using corresponding 
   * regular expression and throws the corresponding error.
   * @param {string} model - 'confirm' || 'email' || 'name' ||
   *                         'password' || 'phone'
   * @param {string} info - text info
   * @return error message or undefined
   */
  static check(model: string, info: string): string {
    if(this._regexp[model].test(info)) {
      return undefined;
    } else {
      return this._errors[model];
    }
  }
  
  /**
   * This regular expression object contains several regexps
   * mapping to models
   */
  private static _regexp = {
    'password': /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/,
    'email': /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  };

  /**
   * This error object contains several errors string mapping
   * to models
   */
  private static _errors = {
    'password': 'invalid password',
    'email': 'invalid email',
    'name': 'invalid name',
    'phone': 'invalid phone number',
    'confirm': 'invalid confirm code'
  }
}
