import { NextFunction, Request, Response } from "express";
import { UserSchemaInput, UserSchemaOutput, UserOutputSucess } from "../types/user.type";

import User from "../models/user/user.model";
import Question from '../models/question/question.model'
import Answered from "../models/question/answered.model";

export const addNewAnsweredByUser = async (req: Request, res: Response) => {

    try {
        let AnsweredDetails = req.body;

        let answeredCreate = new Answered(AnsweredDetails);

        let finalAnswered = await answeredCreate.save();

        let finalOutput = {
            status: false,
            info: "Answered Created Successfully",
            data: finalAnswered
        };

        return res.status(200).json(finalOutput);
    } catch (error) {
        return res.status(500).json({
            status: true,
            info: "Unable to create Answered for some unknown reason"
        })
    }

}

export const addNewAnsweredToMock = async (req: Request, res: Response) => {

    try {
        let answeredDetails = req.body;

        let answeredCreate = new Answered(answeredDetails);

        let finalAnswered = await answeredCreate.save();

        let finalOutput = {
            status: false,
            info: "Answered Created Successfully",
            data: finalAnswered
        };

        return res.status(200).json(finalOutput);
    } catch (error) {
        return res.status(500).json({
            status: true,
            info: "Unable to create Answered for some unknown reason"
        })
    }

}



export const getAnsweredByID = async (req: any, res: Response, next: NextFunction) => {
    try {


        let answerDetails = await User.findById({ _id: req.params.answerId });

        if (!answerDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: answerDetails
        }

        return res.status(200).json(finalOutput);

    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock information for some unknown reason'
        })
    }
}



export const getAllAnsweredsByUser = async (req: any, res: Response) => {

    try {

        let AnsweredDetails = await Answered.find({ created_by: req.user._id });

        if (!AnsweredDetails) {
            return res.status(404).json({
                status: true,
                info: 'Answers not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Answer Found",
            data: AnsweredDetails
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch Answereds for some  unknown reason'
        })
    }
}

export const getAllAnsweredsByMock = async (req: any, res: Response) => {

    try {

        let AnsweredDetails = await Answered.find({ mock: req.params.mockId });

        if (!AnsweredDetails) {
            return res.status(404).json({
                status: true,
                info: 'Answereds not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: AnsweredDetails
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch Answereds for some  unknown reason'
        })
    }
}

export const getAllAnswereds = async (req: any, res: Response) => {

    try {

        let AnsweredDetails = await Answered.find({});

        if (!AnsweredDetails) {
            return res.status(404).json({
                status: true,
                info: 'Answereds not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: AnsweredDetails
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch Answereds for some  unknown reason'
        })
    }
}


export const updateAnsweredByID = async (req: any, res: Response) => {

    try {

        let AnsweredVerify = await Answered.findById({ _id: req.params.mockId });

        if (AnsweredVerify.created_by !== req?.user?._id) {
            return res.status(401).json({
                status: true,
                info: "UnAuthorized Access"
            })
        }

        let AnsweredDetails = await Answered.findByIdAndUpdate({ _id: req?.params?.AnsweredId }, req.body, { new: true });

        if (!AnsweredDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            })
        }

        let finalOutput = {
            status: false,
            info: 'Answered updated',
            data: AnsweredDetails
        }

        return res.status(200).json(finalOutput);

    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not update Answered information for some unknown reason'
        })
    }
}

