import api from './api';

export const signIn = async(email, password) => {
    const response = await api.post('/members/signin', {email: email, password: password});
    return response.data;
}