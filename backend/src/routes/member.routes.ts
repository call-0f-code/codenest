import { Router } from "express";
import * as memberCtrl from "../controllers/members.controller";
import { auth } from "../middleware/memberAuth";
//import passport from "passport";
//import config from "../config";
import {Multer} from 'multer'

export default function memberRouter(upload: Multer){
    const router = Router();

    // Route to get questions by topic ID
    router.post('/signup', memberCtrl.createMember);
    router.post('/signin', memberCtrl.login);

    //   // OAuth Login - Google
    // router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

    // router.get("/auth/google/callback", passport.authenticate("google", {
    //   failureRedirect: "/login", // adjust to  frontend login page
    //   session: true,
    // }),
    // (req, res) => {
    //   // Redirect to frontend with session or token if you choose JWT
    //   res.redirect(config.GOOGLE_CALLBACK_URL);
    // }
  //);

  // OAuth Login - GitHub
  // router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

  // router.get(
  //   "/auth/github/callback",
  //   passport.authenticate("github", {
  //     failureRedirect: "/login",
  //     session: true,
  //   }),
  //   (req, res) => {
  //     res.redirect(process.env.CLIENT_REDIRECT_URL!);
  //   }
  // );

    router.get('/:memberId', memberCtrl.getDetails);
    router.get('/', memberCtrl.listAllApprovedMembers);
    router.get('/achievements/:memberId', memberCtrl.getAchievements);
    router.get('/projects/:memberId', memberCtrl.getProjects);
    router.get('/interviews/:memberId', memberCtrl.getInterviews);

    router.use(auth);

    router.patch('/members/:memberId', memberCtrl.updateMember);

    return router;
}