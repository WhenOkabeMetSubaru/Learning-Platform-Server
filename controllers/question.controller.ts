import { NextFunction, Request, Response } from "express";
import { UserSchemaInput, UserSchemaOutput, UserOutputSucess } from "../types/user.type";

import User from "../models/user/user.model";
import Question from '../models/question/question.model'
import Bundle from "../models/question/bundle.model";

export const addNewQuestionByUser = async (req: any, res: Response) => {

    try {
        let questionDetails = req.body;
        let parentId;
        if(questionDetails?.parentId) {parentId = questionDetails?.parentId; delete questionDetails?.parentId;}

        questionDetails.created_by = req.user._id;

        if (questionDetails?.bundle) {
            let bundleDetails = await Bundle.findById({ _id: questionDetails?.bundle });

            questionDetails.question_count = bundleDetails?.total_questions + 1;
        }

       

        let questionCreate = new Question(questionDetails);

        let finalQuestion = await questionCreate.save();

        if (parentId && questionDetails?.access_type == "multi_child") {
            let parentDetails = await Question.findByIdAndUpdate({ _id: parentId }, {
                $push: {
                    child_questions:finalQuestion?._id
                }
            });

        }


        if (questionDetails?.bundle) {
            let updatedBundle = await Bundle.findByIdAndUpdate({ _id: questionDetails?.bundle }, {
                $inc: {
                    total_questions: 1
                }
            })
        }

        let finalOutput = {
            status: false,
            info: "Question Created Successfully",
            data: finalQuestion
        };

        return res.status(200).json(finalOutput);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: true,
            info: "Unable to create question for some unknown reason"
        })
    }

}

export const addNewQuestionToMock = async (req: Request, res: Response) => {

    try {
        let questionDetails = req.body;

        let questionCreate = new Question(questionDetails);

        let finalQuestion = await questionCreate.save();

        let finalOutput = {
            status: false,
            info: "Question Created Successfully",
            data: finalQuestion
        };

        return res.status(200).json(finalOutput);
    } catch (error) {
        return res.status(500).json({
            status: true,
            info: "Unable to create question for some unknown reason"
        })
    }

}



export const getQuestionByID = async (req: any, res: Response, next: NextFunction) => {
    try {


        let questionDetails = await Question.findById({ _id: req.params.questionId });

        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Question not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "question Found",
            data: questionDetails
        }

        return res.status(200).json(finalOutput);

    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock information for some unknown reason'
        })
    }
}



export const getAllQuestionsByUser = async (req: any, res: Response) => {

    try {

        
        let questionDetails = await Question.find({ created_by: req.user._id,access_type:{$in:["single","read_only","multiple"]} }).sort({"createdAt":-1});

        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: questionDetails
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        })
    }
}

export const getAllAttemptedQuestionsByUser = async (req: any, res: Response) => {

    try {

        let questionDetails = await Question.find({ created_by: req.user._id, access_type: { $in: ["answers_non_mock","multiple_non_mock"]} });



        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            })
        }




        let finalOutput = {
            status: false,
            info: "Questions Found",
            data: questionDetails
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        })
    }
}

export const getAllQuestionsByMock = async (req: any, res: Response) => {

    try {

        let questionDetails = await Question.find({ mock: req.params.mockId });

        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: questionDetails
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        })
    }
}

export const getAllQuestionsByBundle = async (req: any, res: Response) => {

    try {

        let questionDetails = await Question.find({ bundle: req.params.bundleId, access_type: "mock_only" });

        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Question Found",
            data: questionDetails
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        })
    }
}

export const getAllQuestions = async (req: any, res: Response) => {

    try {

        let questionDetails = await Question.find({});

        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: questionDetails
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        })
    }
}

export const getQuestionAccess  = async(req:any,res:any)=>{

    try {

        let questionData: any = [];
        let questionExists = await Question.findOne({ testId: req.params.questionId, created_by: req.user?._id, access_type: { $in: ["answers_non_mock","multiple_non_mock"]} });



        if (questionExists) {
            questionData.push(questionExists);

            if(questionExists.access_type=='multiple'){

             
                let childQuestions = await Question.find({ access_type: "multi_child", _id: { $in: questionExists?.child_questions } });

                if (childQuestions?.length > 0) {
                    questionData = [...questionData, ...childQuestions]
                }

                
            }
            return res.status(200).json({
                status: false,
                info: "Success Data Retrieved",
                data: questionData
            })
        }



        let questionDetails = await Question.findById({ _id: req.params.questionId })

        if(questionDetails.access_type=='read_only'){
            return res.status(400).json({
                status:true,
                info:"Not Valid Question"
            })
        }

      

        if(questionDetails?.access_type=='single'){

            let questionObj = {
                options: questionDetails.options,
                correct_answer: questionDetails.correct_answer,
                question_topic: questionDetails.question_topic,
                question_view_type: questionDetails.question_view_type,
                category: questionDetails.category,
                awarded_points: questionDetails.awarded_points,
                negative_points: questionDetails.negative_points,
                question_type: questionDetails.question_type,
                difficulty: questionDetails.difficulty,
                question_timer_solo: questionDetails.question_timer_solo,
                question: questionDetails.question,
                answer_explanation: questionDetails.answer_explanation,
                primary_data: questionDetails.primary_data,
                testId: questionDetails._id,
                question_count: questionDetails?.question_count,
                access_type: 'answers_non_mock',
                question_status: "not_visited",
                created_by: req.user._id


            }

            let questionCreate = new Question(questionObj);

            let finalResult = await questionCreate.save();

            questionData.push(finalResult);

        }else if(questionDetails?.access_type=='multiple'){

            let questionObj = {
                options: questionDetails.options,
                correct_answer: questionDetails.correct_answer,
                question_topic: questionDetails.question_topic,
                question_view_type: questionDetails.question_view_type,
                category: questionDetails.category,
                awarded_points: questionDetails.awarded_points,
                negative_points: questionDetails.negative_points,
                question_type: questionDetails.question_type,
                difficulty: questionDetails.difficulty,
                question_timer_solo: questionDetails.question_timer_solo,
                question: questionDetails.question,
                answer_explanation: questionDetails.answer_explanation,
                primary_data: questionDetails.primary_data,
                testId: questionDetails._id,
                question_count: questionDetails?.question_count,
                access_type: 'multiple_non_mock',
                question_status: "not_visited",
                created_by: req.user._id


            }

            let questionCreate = new Question(questionObj);

            let parentFinalResult = await questionCreate.save();

            questionData.push(parentFinalResult);


            let childQuestions = await Question.find({ access_type: "multi_child", _id: { $in: questionDetails?.child_questions } });

            let newQuestions = childQuestions?.map((item: any,num:number) => {

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
                    question_timer_solo: item?.question_timer_solo,
                    question: item?.question,
                    answer_explanation: item?.answer_explanation,
                    primary_data: item?.primary_data,
                    question_count: item?.question_count,
                    access_type: 'multi_child',
                    question_status: "not_visited",
                    created_by: req.user._id,
                    testId:item._id,
                }
            })


            for(let i = 0;i<newQuestions?.length;i++){
                let newData = new Question(newQuestions[i]);
                let result = await newData?.save();
                let parentDetails = await Question.findByIdAndUpdate({ _id: parentFinalResult._id}, {
                    $push: {
                        child_questions: result?._id
                    }
                });

                questionData.push(result);
            }

           
        }


    

        let finalOutput = {
            status: false,
            info: "Question Created for User",
            data: questionData

        }

        return res.status(200).json(finalOutput);
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: true,
            info: 'Could not fetch question details for  unknown reason'
        })
    }
}


export const getAllQuestionsHomePage = async (req: any, res: Response) => {

    try {

        let questionDetails = await Question.find({ access_type: { $in: ["multiple", "single","read_only"] } }).sort({"createdAt":-1});

        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Questions Found",
            data: questionDetails
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        })
    }
}

export const getQuestionDetails = async (req: any, res: Response) => {

    try {
        
        let questionData = [];

        let questionDetails = await Question.findById({_id:req.params.questionId});

        questionData?.push(questionDetails);
       
        if (questionDetails.access_type == 'multiple' || questionDetails.access_type == 'multiple_non_mock'){
           
            let childQuestions = await Question.find({access_type:"multi_child",_id:{$in:questionDetails?.child_questions}});
           
            if(childQuestions?.length>0){
                questionData = [...questionData,...childQuestions]
            }
        }

        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            })
        }


        let finalOutput = {
            status: false,
            info: "Questions Found",
            data: questionData
        }

        return res.status(200).json(finalOutput);



    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        })
    }
}

export const updateQuestionByID = async (req: any, res: Response) => {

    try {

        let questionVerify = await Question.findById({ _id: req.params.mockId });

        if (questionVerify.created_by !== req?.user?._id) {
            return res.status(401).json({
                status: true,
                info: "UnAuthorized Access"
            })
        }

        let questionDetails = await Question.findByIdAndUpdate({ _id: req?.params?.questionId }, req.body, { new: true });

        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            })
        }

        let finalOutput = {
            status: false,
            info: 'Question updated',
            data: questionDetails
        }

        return res.status(200).json(finalOutput);

    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not update question information for some unknown reason'
        })
    }
}

export const updateQuestionStatusForMock = async (req: any, res: Response) => {

    try {


        let questionData = await Question.findById({ _id: req.params.questionId });

        let updateObj: any = {
            question_status: req.body.question_status
        }

        if (req.body.user_answer !== '') {

            if (req.body.question_status == 'reviewed_and_answered' && questionData?.question_status == 'reviewed_not_answered') {
                updateObj = {
                    ...updateObj,
                    user_answer: req.body.user_answer,
                    question_status: 'answered'
                }
            } else if (req.body.question_status == 'reviewed_and_answered' && questionData?.question_status !== 'reviewed_not_answered') {
                updateObj = {
                    ...updateObj,
                    user_answer: req.body.user_answer,
                    question_status: 'reviewed_and_answered'
                }
            } else {
                updateObj = {
                    ...updateObj,
                    user_answer: req.body.user_answer
                }
            }



        } else if ((req.body.question_status == 'reviewed_and_answered' || req.body.question_status == "reviewed_not_answered") && (!req.body.user_answer || req.body.user_answer == '')) {


            updateObj = {
                ...updateObj,
                user_answer: ""
            }
        } else if (req.body.question_status == 'not_answered' && req.body.user_answer == '') {
            updateObj = {
                ...updateObj,
                user_answer: ""
            }
        }







        let questionDetails = await Question.findByIdAndUpdate({ _id: req?.params?.questionId }, updateObj, { new: true });

        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: "Could not update"
            })
        }

        let finalOutput = {
            status: false,
            info: 'Question updated',
            data: questionDetails
        }

        return res.status(200).json(finalOutput);

    } catch (error) {

        return res.status(400).json({
            status: true,
            info: 'Could not update question information for some unknown reason'
        })
    }
}



export const getAllQuestionsByPageAndFilter = async (req: any, res: any) => {

    try {

        let params = req.query;

      
        let query: any = {
            access_type:["single","read_only","multiple"]
        };



        let options = {
            page: params?.pageNumber || 1,
            limit: params?.pageSize || 10,
            sort: {
                'createdAt': params?.sort || -1
            }
        }


        let questionDetails = await Question.paginate(query, options);

        if (questionDetails?.docs?.length < 1) {
            return res.status(404).json({
                status: true,
                info: "Not Found"
            })
        }

        return res.status(200).json({
            status: false,
            info: "Found the Data",
            data: questionDetails.docs,
            totalDocs: questionDetails.totalDocs,
            limit: questionDetails.limit,
            totalPages: questionDetails.totalPages,
            page: questionDetails.page

        })







    } catch (error: any) {
        return res.status(500).json({
            status: true,
            info: error.message
        })
    }

}



