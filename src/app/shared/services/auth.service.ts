import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private isLodingSub$  : BehaviorSubject<boolean>= new BehaviorSubject(false)
isLodingObs$: Observable<boolean>= this.isLodingSub$.asObservable()
  constructor() { }


  setLodingStatus(status:boolean){
    this.isLodingSub$.next(status)
  }
}
