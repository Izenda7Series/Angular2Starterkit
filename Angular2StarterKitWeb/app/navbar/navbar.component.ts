import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-bar',
    templateUrl: 'navbar.component.html'
})

export class Navbar { 
    currentUser:string;
    constructor(private router: Router) {
         this.currentUser = localStorage.getItem("currentUser");
     }
    logout()
    {
        this.router.navigate(['/login']);
    }

}