import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityModule } from "./activity/activity.module";
import { ActivityListComponent } from "./activity/components/activity-list/activity-list.component";
import { LoginComponent } from "./login/login.component";



const routes: Routes =[
    {path: '', component : ActivityListComponent},
    {path: 'login', component : LoginComponent}
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
