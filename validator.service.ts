/**
 * This regular expression object contains several regexps
 * mapping to models
 * In this validator:
 *  - CONFIRM: confirmation code must be 6 digits
 *  - EMAIL: email must include '@' and '.'
 *  - FIRSTNAME: first name should only have 'a-z' or ',.'-' character
 *  - INFO: info is either an email or a phone number
 *  - LASTNAME: last name should only have 'a-z' or ',.'-' character
 *  - PASSWORD: password must be at least 6 characters including at least 
 *    one digit and one character
 *  - PHONE: phone number must be 10 digits
 */
const REGEXP = {
  'CONFIRM': /^\d{6}$/,
  'EMAIL': /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  'FIRSTNAME': /^[a-z ,.'-]+$/i,
  'INFO': /([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)|(^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$)/,
  'LASTNAME': /^[a-z ,.'-]+$/i,
  'PASSWORD': /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/,
  'PHONE': /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
}

/**
 * This error object contains several errors string mapping
 * to models
 */
const ERRORS = {
  'CONFIRM': 'invalid confirm code',
  'CONFIRMPASSWORD': 'passwords don\'t match',
  'EMAIL': 'invalid email',
  'FIRSTNAME': 'first name is not correct',
  'INFO': 'invalid info: information should be a valid phone number or email',
  'LASTNAME': 'last name is not correct',
  'PASSWORD': 'invalid password',
  'PHONE': 'invalid phone number',
  'REQUIRED': 'please fill all information'
}

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
   * @return error message 
   */
  static check(model: string, info: string): string {
    if(REGEXP[model].test(info)) {
      return '';
    } else {
      return ERRORS[model];
    }
  }
  
  /**
   * This method is used to group check the text areas and 
   * throw all the errors together.
   * @param {string} json - transform your object into string
   *                        first
   * @param {num} num - indicate how many keys in the object 
   *                    is required
   * @return group error messages
   */
  static checkJSON(json: string, num: number = 0) {
    let obj = JSON.parse(json);
    let errors = '';
    let count = 0;
    for(var key in obj) {
      if(key === 'CONFIRMPASSWORD') {
        if(obj[key] !== obj.PASSWORD) {
          errors += ERRORS[key]+', ';
        }
      } 
      else if(!REGEXP[key].test(obj[key])) {
        errors += ERRORS[key]+', ';
      }
      count++;
    }
    if(count < num) {
      return ERRORS['REQUIRED'];
    } else {
      return errors.substring(0, errors.length - 2);
    }
  }  
}
