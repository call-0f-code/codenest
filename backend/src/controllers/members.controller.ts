import { Request, Response } from "express";
import api from "../utils/api";
import bcrypt from 'bcrypt';
import config from "../config";
import jwt from 'jsonwebtoken';
import FormData from "form-data";
import { ApiError } from "../utils/apiError";
import { resetPasswordSchema, UpdateSchema } from "../validation/members.validator";
import axios from "axios";
import { otpStorage } from "../utils/otpStore";
import { sendOTP } from "../utils/nodeMailer";

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const createMember = async(req: Request, res:Response) => {
        
    const hashedPassword = await bcrypt.hash(req.body.password, Number(config.SALTING));

    req.body.password = hashedPassword;
    const newUser = await api.post('members/', req.body)

    res.status(201).json({
        success: true,
        message: newUser.data.message
    })
}

export const login = async(req: Request, res:Response) => {

    const { email, password } = req.body;
    if(!email || !password) throw new ApiError("Email or password field absent", 400);

    const check = await api.get(`/members/?email=${email}`);

    const userId = check.data.user.id;
    const hashedPassword = check.data.user.accounts[0];
    const isApproved = check.data.user.isApproved;

    if(!isApproved) {
        throw new ApiError("Unauthorized access detected", 403)
    }
    
    const isPasswordValid = await bcrypt.compare(password, hashedPassword.password);
    if(!isPasswordValid) {
      throw new ApiError("Invalid password", 403)
    }

    // Generate JWT token
    const token = await jwt.sign({ userId }, config.JWT_SECRET as string, { expiresIn: "1d" });

    // Send response
    res.status(200).json({
      success: true,
      message: "Signin successful",
      token,
    });
}

export const getDetails = async(req: Request, res: Response) => {

    const memberId = req.userId;

    const user = await api.get(`/members/${memberId}`);

    const users = user.data.user;
    res.status(200).json({
        success: true,
        users
    })   
}

export const updateMember = async(req: Request, res:Response) => {

    const memberId = req.userId;
    const rawmemberData = req.body.memberData;
    
    let memberData = JSON.parse(rawmemberData);
    const check = UpdateSchema.safeParse(memberData);

    if(!check.success) throw new ApiError('Validation error', 400);
    
    const formData = new FormData();

    formData.append("memberData", memberData);

    if (req.file) {
        formData.append("file", req.file.buffer, req.file.originalname);
    }
    
    const updation = await axios.patch(`${config.API_URL}/api/v1/members/${memberId}`, formData);

    res.status(200).json({
        success :true,
        user: updation.data.user
    })
}

export const getAchievements = async(req: Request, res:Response) => {

    const memberId = req.userId;

    const achievement = await api.get(`/members/${memberId}/achievements`);
    const achievements = achievement.data.achievements;

    res.status(200).json({
        success: true,
        achievements
    })
}

export const getInterviews = async(req:Request, res:Response) => {

    const memberId = req.userId;

    const interview = await api.get(`/members/${memberId}/interviews`);

    const interviews = interview.data.interviews;
    res.status(200).json({
        success: true,
        interviews
    })
}

export const getProjects = async(req:Request, res:Response) => {

    const memberId = req.userId;

    const project = await api.get(`members/${memberId}/projects`);
    const projects = project.data.projects;

    res.status(200).json({
        success: true,
        projects
    })
}

export const forgotpassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    if(!email) throw new ApiError('email field absent', 400);

    const check = await api.get(`/members/?email=${email}`);
    const user = check.data.user;
    if(!user) throw new ApiError('Member not found', 404); 

    const otp = generateOtp();
    otpStorage.store(email, otp);
    await sendOTP(email, otp);

    res.status(200).json({
        success: true,
        message: 'OTP sent to your email'
    })
};

export const verifyOtp = async(req:Request,res:Response) => {

    const {email ,otp} = req.body;
    if(!email || !otp) throw new ApiError("email or otp field absent", 400);
   
    const isValid = otpStorage.verify(email,otp);
    if(!isValid) throw new ApiError("OTP is not valid", 403);

    const check = await api.get(`/members/?email=${email}`);
    const userId = check.data.user.id;

    const token = await jwt.sign({ userId }, config.JWT_SECRET as string, { expiresIn: "1d" });
    res.status(200).json({
        success: true,
        token: token
    })
};

export const resetpassword = async (req: Request, res: Response) => {
   
    const memberId = req.userId;
    const rawmemberData = req.body.memberData; 
    let memberData = JSON.parse(rawmemberData);

    let check = await resetPasswordSchema.safeParse(memberData);
    if(!check.success) throw new ApiError('Validation error', 400);

    const password = memberData.password;

    if( !password) throw new ApiError("Password absent", 400)
    const hashedPassword = await bcrypt.hash(password, Number(config.SALTING));
    memberData.password = hashedPassword
    const formData = new FormData();
    
    formData.append("memberData", JSON.stringify(memberData));
    const updation = await axios.patch(`${config.API_URL}/api/v1/members/${memberId}`, formData);
    res.status(200).json({
        success: true,
        user: updation.data.user
    })
};
