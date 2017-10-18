import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { AuthenticationService } from '../_services/index';

@Component({
    selector: 'nav-bar',
    templateUrl: 'navbar.component.html'
})

export class Navbar { 
    currentUser: Observable<string>;
    isAuthenticated: Observable<boolean>;

    constructor(private router: Router, private authService: AuthenticationService) {
         this.currentUser = authService.currentUser();
         this.isAuthenticated = authService.isAuthenticated();
    }

    logout()
    {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}