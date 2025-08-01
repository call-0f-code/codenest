import { Request, Response } from "express";
import api from "../utils/api";
import bcrypt from 'bcrypt';
import config from "../config";
import jwt from 'jsonwebtoken';
import FormData from "form-data";
import { ApiError } from "../utils/apiError";
import { CreateUserSchema } from "../validation/members.validator";
import axios from "axios";

export const createMember = async(req: Request, res:Response) => {
    
    const rawmemberData = req.body.memberData;
    
    let memberData=JSON.parse(rawmemberData);
    const check = CreateUserSchema.safeParse(memberData);

    if(!check) throw new ApiError('Validation error', 400);
    const file = req.file;

    const formData = new FormData();

    if(file) formData.append('file', file.buffer, file.originalname);
    const hashedPassword = await bcrypt.hash(memberData.password, Number(config.SALTING));

    formData.append('email', memberData.email);
    formData.append('name', memberData.name);
    formData.append('password', hashedPassword);
    formData.append('passoutYear', String(memberData.passoutYear));
    formData.append('provider', memberData.provider);

    const newUser = await axios.post(`${config.API_URL}/api/v1/members/`, formData, {
        headers: formData.getHeaders(),
    })

    if(!newUser.data.success) {
        return res.status(403).json({
            error: true,
            message: newUser.data.message
        })
    }
    res.status(201).json({
        success: true,
        message: newUser.data.message
    })
}

export const login = async(req: Request, res:Response) => {

    const { email, password } = req.body;

    const check = await api.get(`/members/?email=${email}`);

    const userId = check.data.user.id;
    const hashedPassword = check.data.user.accounts[0];
    const isApproved = check.data.user.isApproved;

    if(!isApproved) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access detected"
      })
    }

    const isPasswordValid = await bcrypt.compare(password, hashedPassword.password);
    if(!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: "Invalid password"
      })
    }

    // Generate JWT token
    const token = jwt.sign({ userId }, config.JWT_SECRET as string, { expiresIn: "1d" });

    // Send response
    res.status(200).json({
      success: true,
      message: "Signin successful",
      token,
    });
}

export const getDetails = async(req: Request, res: Response) => {

    const {memberId} = req.params;

    if(!memberId) throw new ApiError('Required fields absent', 400);
    const user = await api.get(`/members/${memberId}`);

    const users = user.data.user;
    res.status(200).json({
        success: true,
        users
    })   
}

export const listAllApprovedMembers = async(req:Request, res:Response) => {

    const members = await api.get('/members');
    res.status(200).json({
        success: true,
        users: members.data.user
    })
}

export const updateMember = async(req: Request, res:Response) => {

    const memberId = req.userId;
    
    const formData = new FormData();

    formData.append("memberData", req.body.memberData);
    if (req.file) {
    formData.append("file", req.file.buffer, req.file.originalname);
    }

    const updation = await axios.patch(`${config.API_URL}/api/v1/members/${memberId}`, formData);

    console.log(updation.data);
    res.status(200).json({
        success :true,
        user: updation.data.user
    })
}

export const getAchievements = async(req: Request, res:Response) => {

    const {memberId} = req.params;

    if(!memberId) throw new ApiError('Required fields absent', 400);
    const achievement = await api.get(`/members/${memberId}/achievements`);
    const achievements = achievement.data.achievements;

    res.status(200).json({
        success: true,
        achievements
    })
}

export const getInterviews = async(req:Request, res:Response) => {

    const {memberId} = req.params;

    if(!memberId) throw new ApiError('Required fields absent', 400);
    const interview = await api.get(`/members/${memberId}/interviews`);
    if(!interview.data.success) {
        res.status(402).json({
            success: false,
            message: "Error fetching interviews"
        })
    }

    const interviews = interview.data.interviews;
    res.status(200).json({
        success: true,
        interviews
    })
}

export const getProjects = async(req:Request, res:Response) => {

    const {memberId} = req.params;

    if(!memberId) throw new ApiError('Required fields absent', 400);
    const project = await api.get(`members/${memberId}/projects`);
    const projects = project.data.projects;

    res.status(200).json({
        success: true,
        projects
    })
}
