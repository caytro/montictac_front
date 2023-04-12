import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityModule } from "./activity/activity.module";
import { ActivityListComponent } from "./activity/components/activity-list/activity-list.component";
import { AuthGuard } from "./core/guards/auth.gard";
import { ActivityFormComponent } from "./activity/components/activity-form/activity-form.component";



const routes: Routes =[
    {path: '', component : ActivityListComponent, canActivate: [AuthGuard]},
    {path: 'createActivity', component: ActivityFormComponent, canActivate: [AuthGuard] },
    {path: 'updateActivity/:id', component: ActivityFormComponent, canActivate: [AuthGuard] }
 ]
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        ActivityModule
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule{


}
