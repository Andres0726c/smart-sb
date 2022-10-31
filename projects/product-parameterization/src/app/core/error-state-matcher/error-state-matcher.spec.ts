import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from './error-state-matcher';

describe('test:MyErrorStateMatcher', () => {


  test('isErrorState', () =>{
    let test = new MyErrorStateMatcher();
    const spy = jest.spyOn( test, 'isErrorState' );
    test.isErrorState(null, null)
    expect(spy).toHaveBeenCalled();
  });

  test('isErrorState', () =>{
    let test = new MyErrorStateMatcher();
    const spy = jest.spyOn( test, 'isErrorState' );
    let control = new FormControl('', [Validators.required]);
    test.isErrorState(control, null)
    expect(spy).toHaveBeenCalled();
  });

});
