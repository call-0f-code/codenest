import { Request,Response } from "express";
import { ApiError } from "../utils/apiError";
import api from "../utils/api";

export const getQuestionByQuestionId = async(req:Request,res:Response)=>{
    const {questionId} = req.params;
    if(!questionId){
        throw new ApiError("missing required field",400);
    }

    const response = await api.get(`/questions/${questionId}`);

    const {question} = response.data;
    
    res.status(200).json({
        status:"SUCCESS",
        question
    })

}