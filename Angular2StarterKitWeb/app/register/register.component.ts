import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/index';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    register() {
        this.loading = true;
        console.log(this.model);
        this.authenticationService.register(this.model.tenantname, this.model.username, this.model.password, this.model.confirmpassword)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/login']);
                } else {
                    this.error = 'Register has failed, Try again';
                    this.loading = false;
                }
            },
            error => {
                console.log(error);
                 this.loading = false;
            });
    }
}
