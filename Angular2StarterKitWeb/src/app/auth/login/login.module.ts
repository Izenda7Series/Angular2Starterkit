import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//container component
import { LoginComponent } from './container/login.component';

//shared module
import { SharedAuthModule } from './../shared/sharedAuth.module';


const ROUTES: Routes = [
    { path: '', component: LoginComponent }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedAuthModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: []
})

export class LoginModule { }