
import { Request,Response } from "express";

export interface UserService {
    getUserByID(req:Request,res:Response):any
    getUserByToken():any;
    getAllUsers(req:Request,res:Response):any;
    updateUserByID():any;

}