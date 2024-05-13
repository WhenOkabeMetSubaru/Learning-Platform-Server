import { Request } from "express";
import { UserSchemaOutput } from "./user.type";

export interface DefaultOutputSchema {
    error: Boolean;
    message: String;
}

export interface IGetUserFromResponse extends Request {
    user?: UserSchemaOutput;
}


export type ApprovalInfoStatus = 'pending' | 'verified' | 'rejected';
