import jwt, { JwtPayload } from 'jsonwebtoken';
import  config from '../config/index'
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export const auth = async(req: Request, res: Response, next: NextFunction) => {
  let token;

  //check for oauth
  //if(req.userId) return next();

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError('Not authorized, no token', 400);
  }

  const decoded = await jwt.verify(token, config.JWT_SECRET);
  if(!decoded) {    
    throw new ApiError("Invalid or expired token", 403);
  }

  req.userId = (decoded as JwtPayload).userId;
  next();
};