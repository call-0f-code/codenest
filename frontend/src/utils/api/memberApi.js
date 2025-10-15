import api from './api';

//  router.post('/signup', validate(CreateUserSchema), memberCtrl.createMember);
//     router.post('/signin', validate(SigninSchema), memberCtrl.login);
//     router.post('/forgotPassword',validate(forgotPasswordSchema), memberCtrl.forgotpassword);
//     router.post('/verifyOtp',memberCtrl.verifyOtp)

//     router.use(auth);

//     router.post('/resetPassword', memberCtrl.resetpassword);
//     router.patch('/:memberId', memberCtrl.updateMember);
//     router.get('/:memberId', memberCtrl.getDetails);
//     router.get('/:memberId/achievements', memberCtrl.getAchievements);
//     router.get('/:memberId/projects', memberCtrl.getProjects);
//    router.get('/:memberId/interviews', memberCtrl.getInterviews);

export const signIn = async(email, password) => {
    const response = await api.post('/members/signin', {email: email, password: password});
    return response.data;
}

export const signUp = async(email, password, fullName) => {
    const response = await api.post('/members/signup', {email: email, password: password, name: fullName});
    return response.data;
}

export const getDetails = async(memberId) => {
    const repsonse  = await api.get(`/members/${memberId}`);
    return response.data;
}