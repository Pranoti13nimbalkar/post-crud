import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { BlogDashboardComponent } from "./shared/component/blog-dashboard/blog-dashboard.component";
import { BlogFormComponent } from "./shared/component/blog-form/blog-form.component";
import { BlogComponent } from "./shared/component/blog/blog.component";


const routes : Routes=[
   {
    path: 'blogs',
   component: BlogDashboardComponent
   },
   {
    path: '',
    redirectTo: 'blogs',
    pathMatch: "full"
   },
   {
    path: 'blogs/addBlog',
    component: BlogFormComponent
   },
   {
    path: 'blogs/:id',
    component:BlogComponent
   },
    {
    path: 'blogs/:id/edit',
    component:BlogFormComponent
   }
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}