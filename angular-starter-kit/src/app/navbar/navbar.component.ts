import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/rx';
import { AuthenticationService } from '../_services/index';

@Component({
    selector: 'app-nav-bar',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent {
    currentUser: Observable<string>;
    isAuthenticated: Observable<boolean>;

    constructor(private router: Router, private authService: AuthenticationService) {
         this.currentUser = authService.currentUser();
         this.isAuthenticated = authService.isAuthenticated();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
