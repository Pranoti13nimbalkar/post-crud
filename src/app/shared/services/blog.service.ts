import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBlog } from '../models/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
BASE_URL: string = environment.BASE_URL;
BLOG_URL:string= `${this.BASE_URL}/blogs.json`
  constructor(private _http: HttpClient) { }

  FetchBlogs(): Observable<any>{
 return this._http.get<any>(this.BLOG_URL)
   .pipe(
    map(obj=>{
      let blogArr: Array<IBlog>= [];
      for (const key in obj) {
         blogArr.unshift({...obj[key], blogid: key})
      }
       return blogArr
    })
  
   )
  }

 addBlog(blogObj:IBlog): Observable<{name: string}>{
 return this._http.post<any>(this.BLOG_URL,blogObj)
  } 

  fetchBlog(id:string): Observable<IBlog>{
    let blog_url = `${this.BASE_URL}/blogs/${id}.json`
    return this._http.get<IBlog>(blog_url)
        .pipe(
          map(obj=>{
          
            return {...obj,blogid:id}
          })
        )
  }

  updateBlog(blog:IBlog): Observable<IBlog>{
 
    let Updated_url = `${this.BASE_URL}/blogs/${blog.blogid}.json`
    return this._http.patch<IBlog>(Updated_url,blog)
  }

  removeBlog(id:string):Observable<any>{
   return this._http.delete<any>(`${this.BASE_URL}/blogs/${id}.json`)
  }
}
