import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//container component
import { RegisterComponent } from './container/register.component';

//shared module
import { SharedAuthModule } from './../shared/sharedAuth.module';


const ROUTES: Routes = [
    { path: '', component: RegisterComponent }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedAuthModule
    ],
    declarations: [
        RegisterComponent
    ],
    providers: []
})

export class RegisterModule { }