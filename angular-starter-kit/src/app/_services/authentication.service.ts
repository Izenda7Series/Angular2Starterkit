import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs/rx';
import 'rxjs/add/operator/map';
import { ApiEndpointConfig } from '../api-endpoint-config';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    public token: string;
    public currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser'));
    public isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        this.token =  localStorage.getItem('tokenKey');
    }

    login(tenantname: string, username: string, password: string): Observable<boolean> {
        const url: string = ApiEndpointConfig.getPath('login');

        const urlSearchParams  = new URLSearchParams();
        urlSearchParams.append('grant_type', 'password');
        urlSearchParams.append('tenant', tenantname);
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);

        const body = urlSearchParams.toString();

        const headers: Headers = new Headers(
            { 'Content-Type': 'application/x-www-form-urlencoded',
              'Access-Control-Allow-Origin': '*'});
        const options: RequestOptions = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options )
            .map((response: Response) => {
                const token = response.json() && response.json().access_token;
                console.log(token);
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', username);
                    localStorage.setItem('tokenKey', token);
                    this.getIzendaToken(token);

                    // Notify is authenticated
                    this.isAuthenticatedSubject.next(true);
                    this.currentUserSubject.next(username);
                    return true;
                } else {
                    return false;
                }
            });
    }

    logout() {
        const url: string = ApiEndpointConfig.getPath('logout');
        const token = localStorage.getItem('tokenKey');
        let headers: Headers;
        if (token) {
            headers = new Headers({ 'Authorization': 'Bearer ' + token });
        }
        const body = {};
        const options: RequestOptions = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options )
            .subscribe(response => {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('tokenKey');
                    localStorage.removeItem('izendatoken');

                    // Notify is not authenticated
                    this.isAuthenticatedSubject.next(false);
                    this.currentUserSubject.next(null);
                },
            err => {
                console.log(err);
                });

    }

    register(tenantname: string, username: string, password: string, confirmpassword: string) {
        const url: string = ApiEndpointConfig.getPath('register');
        const headers: Headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        const body: string = JSON.stringify({Tenant: tenantname,  Email: username, Password: password, ConfirmPassword: confirmpassword });
        const options: RequestOptions = new RequestOptions({ headers: headers });


        return this.http.post(url, body, options )
            .map((response: Response) => {
                if (response.status >= 200 && response.status < 300 ) {
                    return true;
                } else {
                      return false;
                }
            });
    }

    getIzendaToken(token: string): void {
        const url: string = ApiEndpointConfig.getPath('getizendatoken');
        const  headers = new Headers({ 'Authorization': 'Bearer ' + token });
        const options: RequestOptions = new RequestOptions({ headers: headers });

        this.http.get(url, options)
        .subscribe(
            data => {
                console.log(data.json());
                localStorage.setItem('izendatoken', data.json());
            },
            error => {
                console.log('Cannot get Izenda Token');
                console.log(error);
            });
    }

    hasToken(): boolean {
        return !!localStorage.getItem('tokenKey');
    }

    currentUser(): Observable<string> {
        return this.currentUserSubject.asObservable();
    }

    isAuthenticated(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }
}
