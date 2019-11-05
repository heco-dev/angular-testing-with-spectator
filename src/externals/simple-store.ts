
import { Observable, ReplaySubject, isObservable } from 'rxjs';
import { take } from 'rxjs/operators';

/**
 * "version": "0.0.013",
 * Constructs a very basic yet effective value store based on a ReplaySubject(1).
 * Offers a state$ Observable of the subject, methods to retrieve set counts,
 * and method to reset the state object with a completely new subject.
 *
 * @author Marcus Pajda
 */
export class SimpleStore<T> {

  /** Observable of the state value for which this class is being instantiated. */
  state$: Observable<T>;
  /** Internal counter of times state set. */
  protected stateSetCount = 0;
  /** Internal ReplaySubject(1) which can receive/emit the value of the instantiated type. */
  protected stateSubject: ReplaySubject<T>;
  /** Internal. Holds most recent state set value. Currently set but unused. */
  protected stateValue: T;

  /**
   * Calls the setup procedure. Optionally takes an initial value.
   * Initial can be valid value for the type provided, or an observable that will emit value of type.
   * @param initialValue A valid value for the type provided, or an observable that will emit value of type.
   * @method constructor
   */
  constructor(initialValue?: T | Observable<T>) {
    this.setup(initialValue);
  }

  /**
   * Pushes the given new state value to the subject and increments the set counter.
   * Optionally detects that an Observable was passed and subscribes, consumes, and completes the observable.
   * @method setState
   * @param newStateValue A valid value for the type provided, or an observable that will emit value of type T.
   */
  setState(newStateValue: T | Observable<T>) {
    if (newStateValue !== undefined) {
      if (isObservable(newStateValue)) {
        newStateValue.pipe(take(1)).subscribe({
          next: (response: T) => this.stateSubject.next(response)
        });
      } else {
        this.stateSubject.next(newStateValue);
      }
      this.stateSetCount ++;
    } else {
      console.error('Expected valid value, got ' + newStateValue);
    }
  }

  /**
   * Indicates whether the state has been set for this store since setup/reset.
   * @method hasStateBeenSet
   * @return boolean value representing if the state has been set on this store since setup/reset.
   */
  hasStateBeenSet() {
    return this.stateSetCount ? true : false;
  }

  /**
   * Gets the total times the state has been set for this store since setup/reset.
   * @method getStateSetCount
   * @return the number of times the state value has been set since setup/reset.
   */
  getStateSetCount() {
    return this.stateSetCount;
  }

  /**
   * Allows the instance to be effectively reset to new.
   * Will unsubscribe current subscriptions and call the setup method.
   * This resets the state counter and re-creates the ReplaySubject.
   * @method reset
   */
  reset() {
    this.stateSubject.unsubscribe();
    this.setup();
  }

  /**
   * Protected method, performs initial setup of the store. Optionally takes an initial value.
   * Creates a new ReplaySubject(1), a new observable of that subject, and a zero-set counter.
   * @param initialValue A valid value for the type provided, or an observable that will emit value of type T.
   * @method setup
   */
  protected setup(initialValue?: T | Observable<T>) {
    this.stateSubject = new ReplaySubject(1);
    this.state$ = this.stateSubject.asObservable();
    this.stateSetCount = 0;
    if (initialValue !== undefined) {
      this.setState(initialValue);
    }
  }

}
