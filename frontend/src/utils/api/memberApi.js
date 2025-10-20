import api from './api';

export const signIn = async(email, password) => {
    const response = await api.post('/members/signin', {email: email, password: password});
    return response.data;
}

export const signUp = async(email, password, fullName, passoutYear) => {
    const response = await api.post('/members/signup', {email: email, password: password, name: fullName, passoutYear: passoutYear, provider: "credentials"});
    return response.data;
}

export const getDetails = async() => {
    const response  = await api.get(`/members/`);
    return response.data;
}

export const verifyOtp = async(email,otp) =>{
    const response = await api.post('/members/verifyOtp',{email,otp})
    return response.data;
}

export const forgotPassword = async(email)=>{
    const response = await api.post('/members/forgotPassword',{email})
    return response.data;
}

export const resetPassword = async(memberData)=>{
    
    const response = await api.post('/members/resetPassword',{memberData})
    return response.data;
}