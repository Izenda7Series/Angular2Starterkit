export interface Authenticate {
    tenant?: string,
    username: string,
    password: string,
    confirmPassword?: string
}

export interface User {
    username: string,
    token: string,
    izendaToken: string,
    authenticated: boolean
}