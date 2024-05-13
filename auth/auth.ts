import User from '../models/user/user.model';
var jsonwt = require('jsonwebtoken')
import { expressjwt } from 'express-jwt'
import { NextFunction, Request, Response } from "express";


export const signUp = async (req: Request, res: Response) => {
    try {

        let checkUser = await User.findOne({email:req.body.email});
        console.log(checkUser)
        if(checkUser){
            return res.json({
                status:false,
                info:"User Already Exist"
            })
        }

        let addedUser = new User(req.body);

        let result = await addedUser.save();

        if (!result) {
            return res.status(400).json({
                status: true,
                info: 'Could not add user for some unknown reason'
            })
        }

        console.log(result)

        return res.status(200).json({
            status: false,
            info: 'User Created Success',
            data: result._doc
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: true,
            info: 'Could not add new user for some unknown reason'
        })
    }
}


export const signin = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        let user = await User.findOne({ "email": req.body.email })
        if (!user) {
            return res.status(401).json({ error: "User not found" })

        }
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({ error: "Email and password don't match." })
        }

        const token = jsonwt.sign({ _id: user._id }, process.env.SECRET_HASH_KEY)
        let date = new Date();
        date.setDate(date.getDate() + 7)
        res.cookie("secret_token", token, { expires: date, sameSite: 'none' })

        return res.json({
            token
        })
    } catch (err) {
        return res.status(401).json({ error: "Could not sign in" })
    }
}
export const signout = (req: Request, res: Response) => {
    res.clearCookie("secret_token");
    return res.status(200).json({
        message: "signed out"
    })
}
export const requireSignin = expressjwt({
    secret: "easyboi",
    algorithms: ['RS256', 'HS256']
})

export const hasAuthorization = (req: any, res: Response, next: NextFunction) => {

    // if(req.headers.authorization.includes("Bearer")){
    //     return res.status(401).json({
    //         error:'Invalid token'
    //     })
    // }



    const authorized = req.user && req.auth && req.user._id == req.auth._id

    if (!(authorized)) {
        return res.status(403).json({
            error: "User is not authorized"
        })

    }

    next()
}

export const attachUser = async (req: any, res: Response, next: NextFunction) => {

    if (!req.auth) {
        return res.status(401).json({
            error: true,
            message: 'Not Authorized'
        })
    }

    let userDetails = await User.findById({ _id: req.auth._id });
    if (!userDetails) {
        return res.status(403).json({
            error: true,
            message: 'No User Found'
        })
    }

    userDetails.hashed_password = undefined;
    userDetails.salt = undefined;
    req.user = userDetails;
    next()
}

export const isUser = async (req: any, res: Response, next: NextFunction) => {
    if (req.user.role !== 'user') {
        return res.status(401).json({
            error: true,
            message: "User Not Authorized"
        })
    }
    next();
}

export const isPaidUser = async (req: any, res: Response, next: NextFunction) => {
    if (req.user.user_type !== 'paid_user') {
        return res.status(401).json({
            error: true,
            message: "User Not Authorized"
        })
    }

    next()
}

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
    if (req.user.user_type !== 'admin') {
        return res.status(401).json({
            error: true,
            message: "User Not Authorized"
        })
    }

    next()
}

export const isValidUserAny = async (req: any, res: Response, next: NextFunction) => {
    if (req.user.user_type !== 'user' && req.user.user_type !== 'admin' && req.user.user_type !== 'paid_user') {
        return res.status(401).json({
            error: true,
            message: "User Not Authorized"
        })
    }
    next()
}
