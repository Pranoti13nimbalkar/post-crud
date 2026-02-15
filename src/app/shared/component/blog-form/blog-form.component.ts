import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IBlog } from '../../models/blogs';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {
blogForm !:FormGroup
isInEditMode:boolean= false
editId!:string;
editObj!:IBlog
  constructor(private _blogSev: BlogService,
    private _router: Router,
    private _routes: ActivatedRoute,
    private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.createForm()
    this.editBlog()
   
  }
  createForm(){
   this.blogForm =new FormGroup({
    title : new FormControl(null, [Validators.required]),
    content:new FormControl(null, [Validators.required]),
    author:new FormControl(null, [Validators.required])
   })
  }

get formControls(){
  return this.blogForm.controls
}

  onSubmit(){
    if(this.blogForm.valid){
      let blogObj = this.blogForm.value;
      this._blogSev.addBlog(blogObj).subscribe({
        next: data=>{
          this._snackbar.openSnackBar(`The blog with id ${data.name} created successfuly`)
          this.blogForm.reset()
          this._router.navigate(['blogs'])
        },
        error: err=>{
          console.log(err);
          
        }
      })
    }
  }

  editBlog(){
     this.editId = this._routes.snapshot.paramMap.get('id')!
     if(this.editId){
      this.isInEditMode= true;
      this._blogSev.fetchBlog(this.editId)
      .subscribe({
        next: data=>{
        //  this.editObj =data
         this.blogForm.patchValue(data)
              this._snackbar.openSnackBar(`The blog with id ${this.editId} Patch successfuly`)
        }
      })
     }
  }

  onUpdate(){
   if(this.blogForm.valid){
     let UPDATED_OBJ = {...this.blogForm.value,  blogid: this.editId};
    console.log( UPDATED_OBJ);
    this._blogSev.updateBlog(UPDATED_OBJ).subscribe({
      next :data =>{
           this._snackbar.openSnackBar(`The blog with id ${this.editId} Updated successfuly`)
            this.blogForm.reset()
          this._router.navigate(['/blogs'])
      },
      error: err=>{
        console.log(err);
        
      }
    })
   
   }
  }
}
