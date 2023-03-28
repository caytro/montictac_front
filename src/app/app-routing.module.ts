import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityModule } from "./activity/activity.module";
import { ActivityListComponent } from "./activity/components/activity-list/activity-list.component";
import { AuthGuard } from "./core/guards/auth.gard";



const routes: Routes =[
    {path: '', component : ActivityListComponent, canActivate: [AuthGuard]},
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
