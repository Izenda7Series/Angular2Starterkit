import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Store } from 'store';

//shared modules
import { SharedModule } from './shared/shared.module';
import { IzendaModule } from './libs/izendacomponents/izenda.module';
import { ExportModule } from './libs/exports/export.module';

//features module
import { AuthModule } from './auth/auth.module';

//services
import { AuthGuard } from "./auth/guard/auth.guard";
import { IzendaIntegrate } from "./_helpers";

//containers
import { AppComponent } from './container/app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/notFound.component';

//components
import { NavbarComponent, FooterComponent } from "./components";

// routes
export const ROUTES: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
	{
		path: 'home',
		component: HomeComponent
	}, {
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(ROUTES, { enableTracing: true }),
		AuthModule,
		SharedModule,
		IzendaModule,
		ExportModule
	],
	declarations: [
		AppComponent,
		NavbarComponent,
		FooterComponent,
		HomeComponent,
		NotFoundComponent
	],
	exports: [

	],
	providers: [
		Store,
		AuthGuard,
		IzendaIntegrate
	],
	bootstrap: [
		AppComponent
	]
})

export class AppModule {

}
