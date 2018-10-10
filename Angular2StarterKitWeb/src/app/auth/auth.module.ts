import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedAuthModule } from './shared/sharedAuth.module';

const ROUTES: Routes = [
	{ path: 'login', loadChildren: './login/login.module#LoginModule' },
	{ path: 'register', loadChildren: './register/register.module#RegisterModule' }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ROUTES),
		SharedAuthModule.forRoot()
	],
	declarations: [],
	providers: [],
	exports: []
})
export class AuthModule { }