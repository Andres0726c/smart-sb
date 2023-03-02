import { PolicyFailedDetailsComponent } from './policy-failed-details.component';

describe('PolicyDetailsComponent', () => {
  let component: PolicyFailedDetailsComponent;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close modal', () => {
    expect(component.close()).toBeUndefined();
  });

});