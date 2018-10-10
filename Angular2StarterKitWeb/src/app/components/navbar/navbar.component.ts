import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './../../auth/shared/services/auth.service';
import { User } from './../../auth/shared/model/user.model';
import { Store } from 'store';

@Component({ selector: 'nav-bar', styleUrls: ['navbar.scss'], templateUrl: 'navbar.component.html' })

export class NavbarComponent implements OnInit {
	currentUser: User;

	constructor(private router: Router, private store: Store, private authService: AuthService) { }

	ngOnInit() {
		this.store.select('user').subscribe((user: User) => {
			this.currentUser = user;
		});
	}

	async logout() {
		await this
			.authService
			.logout();
		this
			.router
			.navigate(['/login']);
	}
}