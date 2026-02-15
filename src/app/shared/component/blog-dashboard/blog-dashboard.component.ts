import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { IBlog } from '../../models/blogs';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.scss']
})
export class BlogDashboardComponent implements OnInit {
blogArr:Array<IBlog>=[]
  constructor(private _blogServ : BlogService,
    private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getBlog()
  }
 

  getBlog(){
    this._blogServ.FetchBlogs()
    .subscribe({
      next: data=>{
    this.blogArr =data
   this._snackbar.openSnackBar(`All  blogs fetch Successfuly `)
    console.log(data);
    
     
       
      },
      error : err=>{
        console.log(err);
      }
    })
  }


  trackByBlog(index:number, blog: IBlog){
    return blog.blogid
  }
}
