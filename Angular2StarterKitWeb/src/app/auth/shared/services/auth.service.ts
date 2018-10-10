import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

import { User } from './../model/user.model';
import { Authenticate } from './../model/user.model';
import Config from './../../../../config';

import { Store } from 'store';

@Injectable()
export class AuthService {
	public token: string = null;
	public currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser'));
	public isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

	auth$: Observable<string> = this.currentUserSubject.asObservable()
		.do((username: string) => {
			if (!username) {
				this.store.set('user', null);
			} else {
				const token = localStorage.get('tokenKey');
				const user = {
					username,
					token,
					authenticated: true
				}
				this.store.set('user', user);
			}
		});

	constructor(private httpClient: HttpClient, private store: Store) { }

	login(auth: Authenticate) {
		const urlLogin = Config.getPath('login');
		const { username, password, tenant } = auth;

		let authHttpParams = new HttpParams()
			.set('grant_type', 'password')
			.set('username', username)
			.set('password', password);

		if (tenant) {
			authHttpParams = authHttpParams.set('tenant', tenant);
		}

		const body = authHttpParams.toString();

		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
		};

		return this
			.httpClient
			.post(urlLogin, body, httpOptions)
			.map((response: any) => {
				const token = response && response['access_token'];
				if (token) {
					this.token = token;
					localStorage.setItem('currentUser', username);
					localStorage.setItem('tokenKey', token);

					// Notify is authenticated
					this
						.isAuthenticatedSubject
						.next(true);
					this
						.currentUserSubject
						.next(username);

					return this.token;
					//return true;
				} else {
					// return false;
					return this.token;
				}
			});
	}

	logout() {
		const url = Config.getPath('logout');
		const token = localStorage.getItem('tokenKey');
		let httpHeaders: HttpHeaders;
		if (token) {
			httpHeaders = new HttpHeaders({
				'Authorization': 'Bearer ' + token
			});
		}
		const body = {};
		const httpOptions = {
			headers: httpHeaders
		};

		return this
			.httpClient
			.post(url, body, httpOptions)
			.subscribe(response => {
				localStorage.removeItem('currentUser');
				localStorage.removeItem('tokenKey');
				localStorage.removeItem('izendatoken');

				const defaultUser: User = {
					username: '',
					token: '',
					izendaToken: '',
					authenticated: false
				};

				this.store.set('user', defaultUser);
				// Notify is not authenticated
				this
					.isAuthenticatedSubject
					.next(false);
				this
					.currentUserSubject
					.next(null);

			}, err => { console.log(err); });

	}

	register(tenantname: string, username: string, password: string, confirmpassword: string) {
		const url: string = Config.getPath('register');
		const httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
		const body: string = JSON.stringify({ Tenant: tenantname, Email: username, Password: password, ConfirmPassword: confirmpassword });
		const httpOptions = {
			headers: httpHeaders
		};

		return this
			.httpClient
			.post(url, body, httpOptions)
			.map((response: any) => {
				let responseStatus = response['status'];
				if (responseStatus >= 200 && responseStatus < 300) {
					return true;
				} else {
					return false;
				}
			});
	}

	getIzendaToken(token: string, callback: any) {
		const url: string = Config.getPath('getizendatoken');
		const httpHeaders: HttpHeaders = new HttpHeaders({
			'Authorization': 'Bearer ' + token
		});
		const httpOptions = {
			headers: httpHeaders
		};

		this
			.httpClient
			.get(url, httpOptions)
			.subscribe((izendaToken: string) => {
				console.log('Izenda token: ' + izendaToken);
				localStorage.setItem('izendatoken', izendaToken);
				const user = {
					username: localStorage.getItem('currentUser'),
					token: localStorage.getItem('tokenKey'),
					izendaToken,
					authenticated: true
				};

				this.store.set('user', user);

				callback && callback();

			}, error => {
				this.store.set('user', null);
				console.log('Cannot get Izenda Token');
				console.log(error);
			});
	}

	hasToken(): boolean {
		return !!localStorage.getItem('tokenKey');
	}

	currentUser(): Observable<string> {
		return this
			.currentUserSubject
			.asObservable();
	}

	isAuthenticated(): Observable<boolean> {
		return this
			.isAuthenticatedSubject
			.asObservable();
	}
}
