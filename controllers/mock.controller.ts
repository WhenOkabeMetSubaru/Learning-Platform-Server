import { NextFunction, Request, Response } from "express";
import { UserSchemaInput, UserSchemaOutput, UserOutputSucess } from "../types/user.type";
import { IGetUserFromResponse } from "../types/global.type";

import Mock from '../models/mock/mock.model'
import User from "../models/user/user.model";
import Bundle from "../models/question/bundle.model";
import Question from "../models/question/question.model";
import Answered from "../models/question/answered.model";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const addNewMockByUser = async (req: any, res: Response) => {

   try {
   
       let mockDetails = req.body;
       mockDetails.created_by = req.user._id;
      
       let checkExists = await Mock.findOne({ completion_status: "pending",created_by:req.user._id });
       

       if (checkExists) {
           return {
               status: true,
               info: "Already Exists",
               data: checkExists
           }
       }


       let mockCreate = new Mock(mockDetails);
     
       let finalMock = await mockCreate.save();

 

       let finalOutput = {
           status: false,
           info: "Mock Created Successfully",
           data: finalMock
       };

       return res.status(200).json(finalOutput);
   } catch (error:any) {
    console.log(error)
        return res.status(500).json({
            status:true,
            info:error.message
        })
   }

}

export const getMockByID = async (req: any, res: Response, next: NextFunction) => {
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

        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock information for some unknown reason'
        })
    }
}



export const getAllMocksByUser = async (req: any, res: Response) => {

    try {

        let mockDetails = await Mock.find({ created_by: req.user._id, completion_status: 'completed', mock_type: "paper" }).sort({ 'createdAt': -1 });

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
            info: 'Could not fetch user  unknown reason'
        })
    }
}

export const getAllAttemptedMocksByUser = async (req: any, res: Response) => {

    try {

        let mockDetails = await Mock.find({ created_by: req.user._id, is_mock_completed_by_user:true, mock_type: "test" }).sort({ 'createdAt': -1 });

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
            info: 'Could not fetch user  unknown reason'
        })
    }
}

export const getPendingMockByUser = async (req: any, res: Response, next: NextFunction) => {
    try {


        let mockDetails = await Mock.findOne({ created_by: req.user._id, completion_status: 'pending' });

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

    } catch (error: any) {
        console.log(error.message)
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock information for some unknown reason'
        })
    }
}


export const updateMockByID = async (req: any, res: Response) => {

    try {

        let mockVerify = await Mock.findById({ _id: req.params.mockId });

        if (mockVerify.created_by?.toString() !== req?.user?._id?.toString()) {

            return res.status(401).json({
                status: true,
                info: "UnAuthorized Access"
            })
        }

        let mockDetails = await Mock.findByIdAndUpdate({ _id: req?.params?.mockId }, req.body, { new: true });

        if (!mockDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            })
        }

        let finalOutput = {
            status: false,
            info: 'Mock updated',
            data: mockDetails
        }

        return res.status(200).json(finalOutput);

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: true,
            info: 'Could not update mock information for some unknown reason'
        })
    }
}



export const getAllMocks = async (req: Request, res: Response) => {

    try {

        let mockDetails = await Mock.find({ mock_type: "paper" });

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
            info: 'Could not fetch mock details for  unknown reason'
        })
    }
}


export const getMockAccess = async (req: any, res: any) => {
    try {

        let mockExists = await Mock.findOne({ testId: req.params.mockId, created_by: req.user?._id, mock_type: "test" });



        if (mockExists) {
            return res.status(200).json({
                status: false,
                info: "Mock Found",
                data: mockExists
            })
        }



        let mockDetails = await Mock.findById({ _id: req.params.mockId })


        let start_time = new Date()

        let end_time = new Date();
        end_time.setHours(end_time.getHours() + 1)

        let mockObj = {
            created_by: req.user._id,
            testId: req.params.mockId,
            mock_type: 'test',
            mock_start_time: start_time,
            mock_end_time: end_time,
            title:mockDetails?.title,
            description:mockDetails?.description

        }



        let mockCreate = new Mock(mockObj);

        let finalResult = await mockCreate.save();

        let bundleDetails = await Bundle.find({ mock: req.params.mockId }).sort({ 'created': -1 });

        let bundleDictionary: any = {};

      
        for (let i = 0;i< bundleDetails.length ; i++) {

            let bundleObj = {
                title: bundleDetails[i].title,
                mock: finalResult._id,
                description: bundleDetails[i]?.description,
                section_timer: bundleDetails[i]?.section_timer,
                total_questions: bundleDetails[i]?.total_questions,
                created_by: req.user._id
            }
            // console.log(bundleDetails[i], " version " + i + " ", bundleDetails[i]?.length - 1, bundleObj)

            let newBundle = new Bundle(bundleObj);
            let userBundle = await newBundle.save();

            bundleDictionary[bundleDetails[i]._id] = userBundle?._id;
        }


        let bundleIDArr = bundleDetails?.map((item: any) => {
            return new ObjectId(item?._id);
        })

        let questionDetails = await Question.aggregate([
            {
                $match: {
                    bundle: {
                        $in: bundleIDArr
                    }
                }
            }
        ])

        
        let newQuestions = questionDetails?.map((item: any) => {
           
            return {
                options: item.options,
                correct_answer: item.correct_answer,
                question_topic: item.question_topic,
                question_view_type: item.question_view_type,
                category: item.category,
                awarded_points: item.awarded_points,
                negative_points: item.negative_points,
                question_type: item.question_type,
                difficulty: item.difficulty,
                question_timer_solo: item.question_timer_solo,
                question: item.question,
                answer_explanation: item.answer_explanation,
                primary_data: item.primary_data,
                bundle: bundleDictionary[item.bundle],
                question_count: item?.question_count,
                access_type: 'answers',
                question_status: "not_visited",
                created_by:req.user._id
            }
        })


        let createdQuestions = await Question.insertMany(newQuestions)





        let finalOutput = {
            status: false,
            info: "Mock created for User",
            data: finalResult

        }

        return res.status(200).json(finalOutput);
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock details for  unknown reason'
        })
    }
}


export const getAllDetailsAboutMock = async (req: any, res: any) => {
    try {

        
        let mockDetails = await Mock.findById({ _id: req.params.mockId });

       
        let questionUpdate = await Question.updateMany({ access_type: 'answers',created_by:req.user?._id }, { question_status: "not_visited" });


        let bundleDetails = await Bundle.find({ mock: mockDetails?._id,created_by:req.user._id }).sort({ 'created': -1 });

       

        let getSubmittedSection = bundleDetails?.filter((item: any) => item?.is_submitted == true);

        
      
        if (getSubmittedSection?.length > 0) {
            for (let i = 0; i < getSubmittedSection?.length; i++) {
                let bundleUpdate = await Bundle.findByIdAndUpdate({ _id: getSubmittedSection[i]?._id }, { section_start_time: "", section_end_time: "" })
            }
        }

        let firstPendingSection = bundleDetails?.find((item: any) => item?.is_submitted == false);

        if(!firstPendingSection){

            let finalDataObj = {
                status: false,
                info: "All Sections Submitted",
                data: {
                    mockDetails: mockDetails._doc,
                    bundleDetails: [...bundleDetails],
                    questionDetails: []
                }
            }

            return res.status(200).json(finalDataObj)
        }

        let time1 = new Date();
        let time2 = new Date();
        let bundleTimer = {
            _id: firstPendingSection?._id,
            section_start_time: time1.setMinutes(time1.getMinutes()),
            section_end_time: time2.setMinutes(time2.getMinutes() + firstPendingSection?.section_timer || 10)
        }


        


        let bundleUpdateNew = await Bundle.findByIdAndUpdate({ _id: bundleTimer._id }, { section_start_time: bundleTimer?.section_start_time, section_end_time: bundleTimer?.section_end_time })

        let bundleIDArr = bundleDetails?.map((item: any) => {
            return new ObjectId(item?._id);
        })

        let questionDetails = await Question.aggregate([
            {
                $match: {
                    bundle: {
                        $in: bundleIDArr
                    },
                    access_type: "answers",
                    created_by:new ObjectId(req.user._id)
                }
            },
            {
                $group: {
                    "_id": "$bundle",
                    "questions": { $push: "$$ROOT" }
                }
            }
        ])

      

        let questionArrayFinal: any = {};

        for (let i = 0; i < questionDetails?.length; i++) {
            questionArrayFinal[questionDetails[i]?._id] = questionDetails[i]?.questions
        }




        let finalDataObj = {
            status: false,
            info: "Data Fetched Successfully",
            data: {
                mockDetails: mockDetails._doc,
                bundleDetails: [...bundleDetails],
                questionDetails: questionArrayFinal
            }
        }

        return res.status(200).json(finalDataObj)

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock details for  unknown reason'
        })
    }
}

export const getAllDetailsAboutMockResultPage = async (req: any, res: any) => {
    try {


        let mockDetails = await Mock.findById({ _id: req.params.mockId });


        let questionUpdate = await Question.updateMany({ access_type: 'answers', created_by: req.user?._id }, { question_status: "not_visited" });


        let bundleDetails = await Bundle.find({ mock: mockDetails?._id, created_by: req.user._id }).sort({ 'created': -1 });
        
        let bundleIDArr = bundleDetails?.map((item: any) => {
            return new ObjectId(item?._id);
        })

        let questionDetails = await Question.aggregate([
            {
                $match: {
                    bundle: {
                        $in: bundleIDArr
                    },
                    access_type: "answers",
                    created_by: new ObjectId(req.user._id)
                }
            },
            {
                $group: {
                    "_id": "$bundle",
                    "questions": { $push: "$$ROOT" }
                }
            }
        ])



        let questionArrayFinal: any = {};

        for (let i = 0; i < questionDetails?.length; i++) {
            questionArrayFinal[questionDetails[i]?._id] = questionDetails[i]?.questions
        }




        let finalDataObj = {
            status: false,
            info: "Data Fetched Successfully",
            data: {
                mockDetails: mockDetails._doc,
                bundleDetails: [...bundleDetails],
                questionDetails: questionArrayFinal
            }
        }

        return res.status(200).json(finalDataObj)

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock details for  unknown reason'
        })
    }
}

export const updateMockBundleSubmit = async (req: any, res: any) => {
    try {

        let updateBundle = await Bundle.findByIdAndUpdate({ _id: req.params.bundleId }, {
            is_submitted: true
        }, { new: true });

        if (!updateBundle) {
            return res.status(400).json({
                status: true,
                info: "Failed to update"
            })
        }

        return res.json({
            status: false,
            info: "Updated Successfully",
            data: updateBundle
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock details for  unknown reason'
        })
    }
}

export const updateMockBundleNextStatus = async (req: any, res: any) => {
    try {



        let time1 = new Date();
        let time2 = new Date();

        let bundleDetails = await Bundle.findById({ _id: req.params.bundleId });

        let bundleDetailsFull = await Bundle.find({ mock: bundleDetails?.mock })

        let getSubmittedSection = bundleDetailsFull?.filter((item: any) => item.is_submitted == true);

        if (getSubmittedSection?.length > 0) {
            for (let i = 0; i < getSubmittedSection?.length; i++) {
                let bundleUpdate = await Bundle.findByIdAndUpdate({ _id: getSubmittedSection[i]?._id }, { section_start_time: "", section_end_time: "" })
            }
        }
      
        let timerObj = {

            section_start_time: time1.setMinutes(time1.getMinutes()),
            section_end_time: time2.setMinutes(time2.getMinutes() + bundleDetails?.section_timer)
        }


        let updateBundle = await Bundle.findByIdAndUpdate({ _id: req.params.bundleId }, timerObj, { new: true });

        if (!updateBundle) {
            return res.status(400).json({
                status: true,
                info: "Failed to update"
            })
        }

        return res.json({
            status: false,
            info: "Updated Successfully",
            data: updateBundle
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock details for  unknown reason'
        })
    }
}

export const getAllMocksByPageAndFilter = async (req: any, res: any) => {

    try {

        

        let params = req.query;

        let query: any = {
            mock_type: {
                $eq: "paper"
            },
            completion_status:"completed"
        };



        let options = {
            page: params?.pageNumber || 1,
            limit: params?.pageSize || 10,
            sort: {
                createdAt: params?.sort || -1
            }
        }


        let mockDetails = await Mock.paginate(query, options);

        if (mockDetails?.docs?.length < 1) {
            return res.status(404).json({
                status: true,
                info: "Not Found"
            })
        }

      

        return res.status(200).json({
            status: false,
            info: "Found the Data",
            data: mockDetails.docs,
            totalDocs: mockDetails.totalDocs,
            limit: mockDetails.limit,
            totalPages: mockDetails.totalPages,
            page: mockDetails.page

        })







    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            status: true,
            info: error.message
        })
    }

}

export const deleteAttemptedMockByUser = async (req:any,res:any) => {

    try {

        let bundleDetails = await Bundle.find({mock:req.params.mockId}).select('_id');
        
        let bundleIDArr = bundleDetails?.map((item: any) => {
            return new ObjectId(item?._id);
        })

        let questionDetails = await Question.aggregate([
            {
                $match: {
                    bundle: {
                        $in: bundleIDArr
                    },
                    access_type: "answers",
                    created_by: new ObjectId(req.user._id)
                }
            },
            {
                $project:{
                    _id:1
                }
            }
        ])

        let filteredQuestions = questionDetails?.map((item:any)=>item._id);
        
        let deletedQuestions = await Question.deleteMany({_id:{$in:filteredQuestions}});
       

        let deletedBundle = await Bundle.deleteMany({_id:{$in:bundleIDArr}})

        let deletedMock = await Mock.deleteOne({_id:req.params.mockId});


        return res.json({
            status:false,
            info:"Success"
        })
    
        
    } catch (error:any) {
        return res.status(500).json({
            status:true,
            info:error.message
        })
    }
}