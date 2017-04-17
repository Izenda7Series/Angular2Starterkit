import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
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