import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authServ : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


  this._authServ.setLodingStatus(true)
  const modifiedReq = request.clone({
    setHeaders: {
      "Auth" : "Token from LS"
    }
  })

    return next.handle(modifiedReq).pipe(
      delay(500),
      finalize(()=>{
        this._authServ.setLodingStatus(false)
      })
    )
  }
}
