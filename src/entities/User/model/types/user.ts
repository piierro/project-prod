export interface User {
    id: string;
    username: boolean;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}