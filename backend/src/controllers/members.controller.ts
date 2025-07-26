import { Request, Response } from "express";
import api from "../utils/api";
import { CreateUserSchema, SigninSchema } from "../validation/members.validator";
import bcrypt from 'bcrypt';
import config from "../config";
import jwt from 'jsonwebtoken';
import axios from "axios";
import FormData from "form-data";
import { ApiError } from "../utils/apiError";

export const createMember = async(req: Request, res:Response) => {
    
    if(!req.file) throw new ApiError("Missing file", 401);
    let parsed = JSON.parse(req.body.adminData);
    const parsedData = CreateUserSchema.safeParse(parsed);
    if (!parsedData.success) {
        res.status(403).json({
        error: true,
        message: parsedData.error.message,
    });
        return;
    }
  
    const password = parsed.password;
    const file = req.file;

    const formData = new FormData();

    if(file) formData.append('file', file.buffer, file.originalname);

    const hashedPassword = await bcrypt.hash(password, Number(config.SALTING));
    parsed.password = hashedPassword;
    formData.append('email', parsed.email);
    formData.append('name', parsed.name);
    formData.append('password', hashedPassword);
    formData.append('passoutYear', String(parsed.passoutYear));

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

    try {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: parsedData.error.message,
      });
    }

    const { email, password } = parsedData.data;
    const check = await api.get(`${config.API_URL}/api/v1/members/?email=${email}&password=${password}`);

    if(!check.data.success) {
      return res.status(400).json({message: "Error signing in"});
    }

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
}catch(err) {
    console.log(err);
}
}

export const getDetails = async(req: Request, res: Response) => {

    const {memberId} = req.params;
    const user = await api.get(`${config.API_URL}/api/v1/members/${memberId}`);
    console.log(user);


    if(!user.data) {
        return res.status(400).json({
            success: false,
            message: "Error fetching details"
        })
    }

    const users = user.data.user;
    res.status(200).json({
        users
    })   
}

export const listAllApprovedMembers = async(req:Request, res:Response) => {

    const members = await api.get(`${config.API_URL}/api/v1/members/`);
    if(!members) {
        return res.status(402).json({
            success: false,
            message: "Error fetching users"
        })
    }

    res.status(200).json({
        success: true,
        members
    })
}

export const updateMember = async(req: Request, res:Response) => {

    const memberId = req.userId;
    const body = req.body;
    
    const updation = await api.patch(`${config.API_URL}/api/v1/members/${memberId}`, {body});
    if(!updation.data.success) {
        return res.status(402).json({
            message: updation.data.message
        })
    }

    res.status(200).json({
        success :true,
        message: res.status(200).json({
            message: updation.data.message
        })
    })
}

export const getAchievements = async(req: Request, res:Response) => {

    const {memberId} = req.params;
    const achievement = await api.get(`${config.API_URL}/api/v1/members/achievements/${memberId}`);
    if(!achievement.data.success) {
        return res.status(402).json({
            success: false,
            message: "Error fetching achievements"
        })
    }

    const achievements = achievement.data.achievements;
    res.status(200).json({
        success: true,
        achievements
    })
}

export const getInterviews = async(req:Request, res:Response) => {

    const {memberId} = req.params;

    const interview = await api.get(`${config.API_URL}/api/v1/members/interviews/${memberId}`);
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
    const project = await api.get(`${config.API_URL}/api/v1/members/projects/${memberId}`);

    if(!project.data.success) {
        res.status(402).json({
            success:false,
            message: "Error fetching projects"
        })
    }

    const projects = project.data.projects;
    res.status(200).json({
        success: true,
        projects
    })
}
