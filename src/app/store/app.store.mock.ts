import {AppState} from './app.state';
import {Store} from '@ngrx/store';

export class AppStoreMock<T> extends Store<T> {
  appState: AppState;

  set state(value: any) {
    this.appState = Object.assign({}, this.appState, value);
  }

}
