import { NextFunction, Request, Response } from "express";
import { UserSchemaInput, UserSchemaOutput, UserOutputSucess } from "../types/user.type";

import User from "../models/user/user.model";
import Question from '../models/question/question.model'
import Bundle from "../models/question/bundle.model";
import Mock from "../models/mock/mock.model";

export const addNewBundleByUser = async (req: any, res: Response) => {

    try {
        let bundleDetails = req.body;

        // if(!bundleDetails.mock){
        //     let checkExists = await Bundle.findOne({ created_by: req.user._id, completion_status: "pending" });

        //     if (checkExists) {
        //         return {
        //             status: true,
        //             info: "Already Exists"
        //         }
        //     }
        // }else{
        //     bundleDetails.completion_status = "completed"
        // }
       

        bundleDetails.created_by = req.user._id;
        let bundleCreate = new Bundle(bundleDetails);

        let finalBundle = await bundleCreate.save();

        let mockUpdate = await Mock.findByIdAndUpdate({_id:finalBundle?.mock},{
            $push:{
                sections:finalBundle._id
            }
        })

        let finalOutput = {
            status: false,
            info: "bundle Created Successfully",
            data: finalBundle
        };

        return res.status(200).json(finalOutput);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: true,
            info: "Unable to create bundle for some unknown reason"
        })
    }

}

export const addNewBundleToMock = async (req: Request, res: Response) => {

    try {
        let bundleDetails = req.body;

        let bundleCreate = new Bundle(bundleDetails);

        let finalBundle = await bundleCreate.save();

        let finalOutput = {
            status: false,
            info: "bundle Created Successfully",
            data: finalBundle
        };

        return res.status(200).json(finalOutput);
    } catch (error) {
        return res.status(500).json({
            status: true,
            info: "Unable to create bundle for some unknown reason"
        })
    }

}


export const getPendingBundleByUser = async (req: any, res: Response, next: NextFunction) => {
    try {


        let mockDetails = await Bundle.findOne({created_by:req.user._id,completion_status:'pending'});

        if (!mockDetails) {
            return res.status(404).json({
                status: true,
                info: 'Bundle not found'
            })
        }
        


        let finalOutput = {
            status: false,
            info: "Bundle Found",
            data: mockDetails
        }

        return res.status(200).json(finalOutput);

    } catch (error:any) {
        console.log(error.message)
        return res.status(400).json({
            status: true,
            info: 'Could not fetch bundle information for some unknown reason'
        })
    }
}


export const getBundleByID = async (req: any, res: Response, next: NextFunction) => {
    try {


        let mockDetails = await User.findById({ _id: req.params.mockId });

        if (!mockDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: mockDetails
        }

        return res.status(200).json(finalOutput);

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock information for some unknown reason'
        })
    }
}



export const getAllBundlesByUser = async (req: any, res: Response) => {

    try {

        let bundleDetails = await Bundle.find({ created_by: req.user._id });

        if (!bundleDetails) {
            return res.status(404).json({
                status: true,
                info: 'bundles not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: bundleDetails
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch bundles for some  unknown reason'
        })
    }
}

export const getAllBundlesByMock = async (req: any, res: Response) => {

    try {

        let bundleDetails = await Bundle.find({ mock: req.params.mockId });
       

        if (!bundleDetails) {
            return res.status(404).json({
                status: true,
                info: 'bundles not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: bundleDetails
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch bundles for some  unknown reason'
        })
    }
}

export const getAllBundles = async (req: any, res: Response) => {

    try {

        let bundleDetails = await Bundle.find({});

        if (!bundleDetails) {
            return res.status(404).json({
                status: true,
                info: 'bundles not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: bundleDetails
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch bundles for some  unknown reason'
        })
    }
}


export const updateBundleByID = async (req: any, res: Response) => {

    try {

        // let bundleVerify = await Bundle.findById({ _id: req.params.mockId });

        // if (bundleVerify.created_by !== req?.user?._id) {
        //     return res.status(401).json({
        //         status: true,
        //         info: "UnAuthorized Access"
        //     })
        // }

        let bundleDetails = await Bundle.findByIdAndUpdate({ _id: req?.params?.bundleId }, req.body, { new: true });

        if (!bundleDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            })
        }

        let finalOutput = {
            status: false,
            info: 'bundle updated',
            data: bundleDetails
        }

        return res.status(200).json(finalOutput);

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: true,
            info: 'Could not update bundle information for some unknown reason'
        })
    }
}

