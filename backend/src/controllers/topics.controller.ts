import { Request,Response } from "express";
import { ApiError } from "../utils/apiError";
import api from "../utils/api";

export const getAllTopics = async(req:Request,res:Response)=>{
    const response = await api.get("/topics");
    const topics =response.data;
    
    res.status(200).json({
        success: true,
        topics
    }) 
}


export const getQuestionBytopicId = async(req:Request,res:Response)=>{
    const {topicId} = req.params;
    if(!topicId){
        throw new ApiError("missing required field",400);
    }
    const response = await api.get(`/topics/${topicId}/questions`);

    const {questions} = response.data;

    res.status(200).json({
        success: true,
        questions
    })
}