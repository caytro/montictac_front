import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { ActivityModule } from "./activity/activity.module";
import { ActivityListComponent } from "./activity/components/activity-list/activity-list.component";
import { AuthGuard } from "./core/guards/auth.gard";
import { ActivityFormComponent } from "./activity/components/activity-form/activity-form.component";
import { LoginComponent } from "./auth/components/login/login.component";
import { NotFoundComponent } from "./core/components/not-found/not-found.component";
import { ErrorPageComponent } from "./core/components/error-page/error-page.component";


const routes: Routes =[
    {path: '', component : ActivityListComponent, canActivate: [AuthGuard]},
    {path: 'createActivity', component: ActivityFormComponent, canActivate: [AuthGuard] },
    {path: 'updateActivity/:id', component: ActivityFormComponent, canActivate: [AuthGuard] },
    {path: 'auth/login', component: LoginComponent},
    {path: 'errorPage', component: ErrorPageComponent},
    {path: '**', component: NotFoundComponent,data:{'url':'toto'}}
   
 ]
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        ActivityModule,
        //AuthRoutingModule
    ],
    exports: [
        RouterModule,
        //AuthRoutingModule
    ]
})

export class AppRoutingModule{}

