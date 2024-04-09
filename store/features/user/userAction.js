import axios from 'axios';
import { toast } from 'react-toastify';

export const signupUser = (data) => async () => {
    try {
        const response = await axios.post('http://localhost:8000/api/register/', data)
        if (response.status === 200) {
            return response?.data;
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        }
    }
};

export const loginUser = (data) => async () => {
    try {
        const response = await axios.post("http://localhost:8000/api-token-auth/", data)
        if (response.status === 200) {
            return response?.data;
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        }
    }
};