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
