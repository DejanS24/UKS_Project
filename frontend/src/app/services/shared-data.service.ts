import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private exchangeObject = new BehaviorSubject({});
  currentExchangeObject = this.exchangeObject.asObservable();

  constructor() { }


  setFocusedObject(dataObject) {
    this.exchangeObject.next(dataObject);
  }
}
