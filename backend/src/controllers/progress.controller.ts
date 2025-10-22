import { Request,Response } from "express";
import { ApiError } from "../utils/apiError";
import api from "../utils/api";

export const getCompletedQuestion = async(req:Request,res:Response)=>{
    const memberId = req.userId;

    const response = await api.get(`/progress/${memberId}/completed-questions`);
    const {completedQuestion} = response.data;

    res.status(200).json({
        success: true,
        completedQuestion
    })

}



export const toggleQuestion = async(req:Request,res:Response)=>{
    const {questionId} = req.params;
    const memberId = req.userId;

    if(!questionId){
        throw new ApiError("missing required field",400);
    }
    await api.patch(`/progress/${memberId}/questions/${questionId}/completed/toggle`);
    res.status(200).json({
        success: true
    })
}