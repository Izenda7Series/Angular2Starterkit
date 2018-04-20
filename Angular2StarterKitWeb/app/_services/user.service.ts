import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AuthenticationService } from './index';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(
        private httpClient: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        const httpHeaders: HttpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        const httpOptions = {
            headers: httpHeaders
        };

        // get users from api
        return this.httpClient.get<User[]>('/api/users', httpOptions);
    }
}