import { Router,Response, Request, NextFunction } from "express";
import * as memberCtrl from "../controllers/members.controller";
import { auth } from "../middleware/memberAuth";
import {Multer} from 'multer'
import { validate } from "../middleware/validate";
import { CreateUserSchema, SigninSchema, UpdateSchema, forgotPasswordSchema } from "../validation/members.validator";

export function parseMemberdata(req: Request, res: Response, next: NextFunction) {
   
  if (req.body.memberData) {
    try {
      req.body.memberData = JSON.parse(req.body.memberData);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid JSON in Member Data field' });
    }
  }
  
  next();
}


export default function memberRouter(upload: Multer){
    const router = Router();

    router.post('/signup', validate(CreateUserSchema), memberCtrl.createMember);
    router.post('/signin', validate(SigninSchema), memberCtrl.login);
    router.post('/forgotPassword',validate(forgotPasswordSchema), memberCtrl.forgotpassword);
    router.post('/verifyOtp',memberCtrl.verifyOtp)

    router.use(auth);

    router.post('/resetPassword', memberCtrl.resetpassword);
    router.patch('/',parseMemberdata,validate(UpdateSchema),memberCtrl.updateMember);
    router.get('/', memberCtrl.getDetails);
    router.get('/:memberId/achievements', memberCtrl.getAchievements);
    router.get('/:memberId/projects', memberCtrl.getProjects);
    router.get('/:memberId/interviews', memberCtrl.getInterviews);

    return router;
}