import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isLoding: boolean= false
  title = 'post-crud';
  private _authServ = inject(AuthService)
ngOnInit(): void {
  this._authServ.isLodingObs$.subscribe(status=>{
    this.isLoding = status
  })
}
}
