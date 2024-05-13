import { DefaultOutputSchema } from "./global.type";


export type UserRole = 'user' | 'paid_user' | 'admin';

export interface UserSchema {
    name?: String;
    email?: String;
    mobile?: String;
    role?: UserRole;
    user_location?: any;
}

export interface UserSchemaInput extends UserSchema {
    password?: String;
}

export interface UserSchemaOutput extends UserSchema {
    _id?: String;

}

export interface UserOutputSucess extends DefaultOutputSchema {

    data: UserSchemaOutput;
}