import api from './api';

export const signIn = async(email, password) => {
    const response = await api.post('/members/signin', {email: email, password: password});
    return response.data;
}

export const signUp = async(email, password, fullName, passoutYear) => {
    const response = await api.post('/members/signup', {email: email, password: password, name: fullName, passoutYear: passoutYear, provider: "credentials"});
    return response.data;
}

export const getDetails = async(memberId) => {
    const response  = await api.get(`/members/${memberId}`);
    return response.data;
}
