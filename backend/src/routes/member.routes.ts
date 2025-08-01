import { Router } from "express";
import * as memberCtrl from "../config/controllers/members.controller";
import { auth } from "../middleware/memberAuth";
import {Multer} from 'multer'
import { validate } from "../middleware/validate";
import { SigninSchema } from "../validation/members.validator";

export default function memberRouter(upload: Multer){
    const router = Router();

    router.post('/signup' ,memberCtrl.createMember);
    router.post('/signin', validate(SigninSchema), memberCtrl.login);
    router.get('/:memberId', memberCtrl.getDetails);
    router.get('/', memberCtrl.listAllApprovedMembers);
    router.get('/:memberId/achievements', memberCtrl.getAchievements);
    router.get('/:memberId/projects', memberCtrl.getProjects);
    router.get('/:memberId/interviews', memberCtrl.getInterviews);

    router.use(auth);

    router.patch('/:memberId', memberCtrl.updateMember);

    return router;
}