import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBlog } from '../../models/blogs';
import { BlogService } from '../../services/blog.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { filter, switchMap } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
blogId!:string;
blogInfo!: IBlog
  constructor(private _routes: ActivatedRoute,
    private _router: Router,
    private _blogServ: BlogService,
    private matDailog : MatDialog,
    private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
 this.getBlog()
  
  }

getBlog()
{
   this.blogId = this._routes.snapshot.params['id']
 if(this.blogId){
   this._blogServ.fetchBlog(this.blogId)
  .subscribe({
    next: data=>{
    this.blogInfo = data
      
    },
    error:err=>{
      console.log(err);
      
    }
  })
 }
} 

onRemove(){
 let  matConfig= new MatDialogConfig()
 matConfig.disableClose = true,
 matConfig.data= `Are you sure, you want to remove Blog with id ${this.blogId} `
 this.matDailog.open(GetConfirmComponent, matConfig).afterClosed().pipe(
  filter(res => res=== true),
  switchMap(() => {
    return  this._blogServ.removeBlog(this.blogId)
  })
 ).subscribe({
  next: res=> {
       this._snackbar.openSnackBar(`The blog with id ${this.blogId} Remove successfuly`)
    this._router.navigate(['/blogs'])
  }
 })
 
 
}

}
