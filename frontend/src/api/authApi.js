import api from './axios';

export const authApi = {
    // 1. 회원가입 (POST /api/auth/register)
    register: async (userData) => {
        // userData = { name, email, password, phone }
        const response = await api.post('/api/auth/register', userData);
        return response.data;
    },

    // 2. 로그인 (POST /api/auth/login)
    login: async (credentials) => {
        // credentials = { email, password }
        const response = await api.post('/api/auth/login', credentials);
        return response.data; // 보통 여기에 accessToken이 들어있음
    },

    // 3. 내 정보 가져오기 (GET /api/auth/me)
    getMe: async () => {
        const response = await api.get('/api/auth/me');
        return response.data;
    }
};