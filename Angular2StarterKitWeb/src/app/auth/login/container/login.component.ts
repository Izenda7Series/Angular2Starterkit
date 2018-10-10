import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../shared/services/auth.service';
import { Authenticate } from './../../shared/model/user.model';

@Component({ templateUrl: 'login.component.html' })

export class LoginComponent implements OnInit, OnDestroy {
    model: any = {};
    loading = false;
    error = '';
    subscription: any;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() { }

    onLogin(authenticate: Authenticate) {
        this.loading = true;
        this.subscription = this
            .authService
            .login(authenticate)
            .subscribe(token => {
                if (token) {
                    const callback = () => {
                        this
                            .router
                            .navigate(['/']);
                    };
                    return this.authService.getIzendaToken(token, callback);

                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            }, error => {
                console.log(error);
                this.loading = false;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
