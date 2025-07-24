import { Router } from "express";
import * as memberCtrl from "../controllers/members.controller";
import { auth } from "../middleware/memberAuth";

export default function topicRouter(){
    const router = Router();

    // Route to get questions by topic ID
    router.post('/signup', memberCtrl.createMember);
    router.post('/signin', memberCtrl.login);
    router.get('/members/:memberId', memberCtrl.getDetails);
    router.get('/members', memberCtrl.listAllApprovedMembers);
    router.get('/members/achievements/:memberId', memberCtrl.getAchievements);
    router.get('/members/projects/:memberId', memberCtrl.getProjects);
    router.get('/members/interviews/:memberId', memberCtrl.getInterviews);

    router.use(auth);

    router.patch('/members/:memberId', memberCtrl.updateMember);

    return router;
}