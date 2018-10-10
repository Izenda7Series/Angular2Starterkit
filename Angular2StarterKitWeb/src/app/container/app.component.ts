import { Component } from '@angular/core';
import { IzendaIntegrate } from './../_helpers/izendaintegrate';
import { Router } from '@angular/router';

@Component({ selector: 'app-root', styleUrls: ['app.component.scss'], templateUrl: 'app.component.html' })

export class AppComponent {

	constructor(private router: Router, private izItergrate: IzendaIntegrate) {
		this
			.izItergrate
			.DoIzendaConfig();
	}

	logout() {
		this
			.router
			.navigate(['/login']);
	}

}