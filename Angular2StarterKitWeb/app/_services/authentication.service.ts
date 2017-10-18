import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {Config} from '../config'
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {
    public token: string;
    public currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser'));
    public isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
    
    constructor(private http: Http, private router:Router) {
        // set token if saved in local storage
        this.token =  localStorage.getItem('tokenKey');
    }

    login(tenantname: string, username: string, password: string): Observable<boolean> {
        let url: string = Config.getPath("login");
        
        let urlSearchParams  = new URLSearchParams();
        urlSearchParams.append('grant_type', 'password');
        urlSearchParams.append('tenant', tenantname);
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);

        let body = urlSearchParams.toString();

        let headers: Headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
        let options: RequestOptions = new RequestOptions({ headers: headers });
        
        return this.http.post(url, body, options )
            .map((response: Response) => {
                let token = response.json() && response.json().access_token;
                console.log(token);
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', username);
                    localStorage.setItem('tokenKey', token);
                    this.getIzendaToken(token);

                    //Notify is authenticated
                    this.isAuthenticatedSubject.next(true);
                    this.currentUserSubject.next(username);
                    return true;
                } else {
                    return false;
                }
            });
    }

    logout(){
        let url: string = Config.getPath("logout");
        var token = localStorage.getItem("tokenKey");
        let headers:Headers;
        if (token) {
            headers = new Headers({ "Authorization": 'Bearer ' + token });
        }
        let body = {};
        let options: RequestOptions = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options )
            .subscribe(response => {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('tokenKey');
                    localStorage.removeItem('izendatoken');

                    //Notify is not authenticated
                    this.isAuthenticatedSubject.next(false);
                    this.currentUserSubject.next(null);
                },
            err=> { 
                console.log(err);
                });
        
    }

    register(tenantname: string, username: string, password: string, confirmpassword: string) {
        let url: string = Config.getPath("register");
        let headers: Headers = new Headers({ "Content-Type": "application/json; charset=utf-8" });
        let body: string = JSON.stringify({Tenant: tenantname,  Email: username, Password: password, ConfirmPassword: confirmpassword });
        let options: RequestOptions = new RequestOptions({ headers: headers });


        return this.http.post(url, body, options )
            .map((response: Response) => {
                if(response.status >= 200 && response.status < 300 ){
                    return true;
                }
                else{
                      return false;
                }
            });
    }

    getIzendaToken(token:string): void {
        let url: string = Config.getPath("getizendatoken");
        let  headers = new Headers({ "Authorization": 'Bearer ' + token });
        let options: RequestOptions = new RequestOptions({ headers: headers });

        this.http.get(url, options)
        .subscribe(
            data => {
                console.log(data.json());
                localStorage.setItem("izendatoken", data.json());
            },
            error => {
                console.log("Cannot get Izenda Token");
                console.log(error);
            });
    }

    hasToken() : boolean {
        return !!localStorage.getItem('tokenKey');
    }

    currentUser(): Observable<string> {
        return this.currentUserSubject.asObservable();
    }

    isAuthenticated() : Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }
}