import { NextFunction, Request, Response } from "express";
import { UserSchemaInput, UserSchemaOutput, UserOutputSucess } from "../types/user.type";
import { IGetUserFromResponse } from "../types/global.type";

import User from "../models/user/user.model";
import jwt from 'jsonwebtoken'

export const addNewUser = async (req: Request, res: Response) => {

    let userDetails: UserSchemaInput = req.body;

    if (!userDetails.role) {
        return res.status(400).json({
            status: true,
            info: "No Role Specified for the user"
        })
    }

    let createdUser = new User(userDetails);

    if (!createdUser) {
        return res.status(400).json({
            status: true,
            info: "Could not create a user"
        })
    }

    let finalUser = await createdUser.save();

    let finalOutput = {
        status: false,
        info: "User Created Success",
        data: finalUser
    };

    return res.status(200).json(finalOutput);

}

export const getUserByID = async (req: any, res: Response, next: NextFunction) => {
    try {


        let userDetails: UserSchemaOutput | null = await User.findById({ _id: req.params.userId });

        if (!userDetails) {
            return res.status(404).json({
                status: true,
                info: 'User not found'
            })
        }

        if (userDetails._id?.toString() !== req.user._id?.toString()) {
            return res.status(401).json({
                status: true,
                info: "User Not Authorized"
            })
        }

        let finalOutput = {
            status: false,
            info: "User Found",
            data: userDetails
        }

        return res.status(200).json(finalOutput);

    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch user information for some unknown reason'
        })
    }
}



export const getUserByToken = async (req: any, res: Response) => {

    try {

        let decoded: any = jwt.verify(req?.headers?.authorization.split(" ")[1], "easyboi");


        let userDetails: UserSchemaOutput | null = await User.findById({ _id: decoded._id });

        if (!userDetails) {
            return res.status(404).json({
                status: true,
                info: 'User not found'
            })
        }

        let finalOutput = {
            status: false,
            info: 'User Found',
            data: userDetails
        }
        res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch user  unknown reason'
        })
    }
}


export const updateUserByID = async (req: IGetUserFromResponse, res: Response) => {

    try {


        let userDetails: UserSchemaOutput | null = await User.findByIdAndUpdate({ _id: req?.user?._id }, req.body, { new: true });

        if (!userDetails) {
            return res.status(404).json({
                status: true,
                info: 'User not found'
            })
        }

        let finalOutput = {
            status: false,
            info: 'User updated',
            data: userDetails
        }

        return res.status(200).json(finalOutput);

    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch user information for some unknown reason'
        })
    }
}

export const getAllUsers = async (req: Request, res: Response) => {

    try {



        let userDetails: UserOutputSucess[] | null = await User.find({}).select('-hashed_password');

        if ((!userDetails)) {
            return res.status(400).json({
                status: true,
                info: 'Users Not Found',
                data: []
            })
        }

        return res.status(200).json({
            status: false,
            info: 'Users Found',
            data: userDetails
        })
    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch user  unknown reason'
        })
    }
}


