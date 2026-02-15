import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogDashboardComponent } from './shared/component/blog-dashboard/blog-dashboard.component';
import { BlogFormComponent } from './shared/component/blog-form/blog-form.component';
import { BlogComponent } from './shared/component/blog/blog.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { BlogCardComponent } from './shared/component/blog-card/blog-card.component';
import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { SummaryPipe } from './shared/pipe/summary.pipe';
import { GetConfirmComponent } from './shared/component/get-confirm/get-confirm.component';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BlogDashboardComponent,
    BlogFormComponent,
    BlogComponent,
    NavbarComponent,
    BlogCardComponent,
    SummaryPipe,
    GetConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
     NgbModule,
     ReactiveFormsModule,
     HttpClientModule,
   
],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
