import { NextFunction, Request, Response } from "express";
import { UserSchemaInput, UserSchemaOutput, UserOutputSucess } from "../types/user.type";

import User from "../models/user/user.model";
import Category from '../models/category/category.model'

export const addNewCategoryByUser = async (req: Request, res: Response) => {

    try {
        let categoryDetails = req.body;

        let categoryCreate = new Category(categoryDetails);

        let finalCategory = await categoryCreate.save();

        let finalOutput = {
            status: false,
            info: "Category Created Successfully",
            data: finalCategory
        };

        return res.status(200).json(finalOutput);
    } catch (error) {
        return res.status(500).json({
            status: true,
            info: "Unable to create Category for some unknown reason"
        })
    }

}

export const addNewCategoryToMock = async (req: Request, res: Response) => {

    try {
        let CategoryDetails = req.body;

        let CategoryCreate = new Category(CategoryDetails);

        let finalCategory = await CategoryCreate.save();

        let finalOutput = {
            status: false,
            info: "Category Created Successfully",
            data: finalCategory
        };

        return res.status(200).json(finalOutput);
    } catch (error) {
        return res.status(500).json({
            status: true,
            info: "Unable to create Category for some unknown reason"
        })
    }

}



export const getCategoryByID = async (req: any, res: Response, next: NextFunction) => {
    try {


        let mockDetails = await Category.findById({ _id: req.params.mockId });

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

        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock information for some unknown reason'
        })
    }
}



export const getAllCategories = async (req: any, res: Response) => {

    try {

        let CategoryDetails = await Category.find({});

        if (!CategoryDetails) {
            return res.status(404).json({
                status: true,
                info: 'Categorys not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: CategoryDetails
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch Categorys for some  unknown reason'
        })
    }
}


export const updateCategoryByID = async (req: any, res: Response) => {

    try {

        let CategoryVerify = await Category.findById({ _id: req.params.mockId });

        if (CategoryVerify.created_by !== req?.user?._id) {
            return res.status(401).json({
                status: true,
                info: "UnAuthorized Access"
            })
        }

        let CategoryDetails = await Category.findByIdAndUpdate({ _id: req?.params?.CategoryId }, req.body, { new: true });

        if (!CategoryDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            })
        }

        let finalOutput = {
            status: false,
            info: 'Category updated',
            data: CategoryDetails
        }

        return res.status(200).json(finalOutput);

    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not update Category information for some unknown reason'
        })
    }
}





