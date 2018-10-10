export interface IUser {
    username : string;
    password : string;
    firstName : string;
    lastName : string;
}

export class User implements IUser {
    constructor(public username : string, public password : string, public firstName : string, public lastName : string) {}
}