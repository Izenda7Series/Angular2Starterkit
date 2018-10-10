import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Authenticate } from './../../model/user.model';

@Component({ selector: 'auth-form', styleUrls: ['auth-form.component.scss'], templateUrl: 'auth-form.component.html' })

export class AuthFormComponent {
    @Output()
    submitted = new EventEmitter<Authenticate>();

    authForm: FormGroup;
    loading: Boolean = false;
    error: string = '';

    constructor(private fb: FormBuilder) {
        this.authForm = fb.group({
            tenant: ['', []],
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    get usernameRequired() {
        const control = this.authForm.get('username');
        return control.touched && control.hasError('required');
    }

    get passwordRequired() {
        const control = this.authForm.get('password');
        return control.touched && control.hasError('required');
    }

    submit() {
        this.loading = true;
        if (this.authForm.valid) {
            const auth: Authenticate = this.authForm.value;
            return this.submitted.emit(auth);
        }
    }
}