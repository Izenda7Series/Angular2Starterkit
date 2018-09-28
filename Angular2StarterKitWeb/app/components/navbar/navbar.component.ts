import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import {AuthenticationService} from '../../_services';

@Component({selector: 'nav-bar', styleUrls: ['navbar.scss'], templateUrl: 'navbar.component.html'})

export class NavbarComponent {
    currentUser : Observable < string >;
    isAuthenticated : Observable < boolean >;

    constructor(private router : Router, private authService : AuthenticationService) {
        this.currentUser = authService.currentUser();
        this.isAuthenticated = authService.isAuthenticated();
    }
    logout()
    {
        this
            .authService
            .logout();
        this
            .router
            .navigate(['/login']);
    }
}