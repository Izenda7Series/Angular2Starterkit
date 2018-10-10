import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';

import { AuthFormComponent } from './components/auth-form/auth-form.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AuthFormComponent
    ],
    exports: [
        AuthFormComponent
    ]
})
export class SharedAuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedAuthModule,
            providers: [AuthService]
        }
    }
}
