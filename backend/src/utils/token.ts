import jwt from 'jsonwebtoken'
import config from '../config';
import { Response } from 'express';


const ACCESS_TTL =  60*config.ACCESS_TTL();
const REFRESH_TTL_SEC = 60*60*24*(config.REFRESH_TTL());
const AccessJwt = config.JWT_SECRET
const RefreshJwt = config.REFRESH_SECRET

export const signAccessToken = (userId:string)=>{
    return jwt.sign({userId},AccessJwt,{expiresIn:ACCESS_TTL});
}

export const signRefreshToken = (userId:string)=>{
    return jwt.sign({userId},RefreshJwt,{expiresIn:REFRESH_TTL_SEC})
}

export const setRefreshCookie = async(res:Response,refreshToken:string)=>{
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('refresh_token',refreshToken,{
        httpOnly:true,
        secure:isProd,
        sameSite:'none',
        maxAge: REFRESH_TTL_SEC * 1000,
        path:'/api/v1/members/refresh'
    })
}