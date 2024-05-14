import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { getTokens, getUserInfo } from "@/common/token.js";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const createTokenRefresh = async () => {
    const store = useStore();
    const router = useRouter();

    try {
        const { userId } = getUserInfo();
        if (!userId) throw { status: 400, message: 'Invalid UserId' };

        const { refreshToken } = getTokens();
        if (!refreshToken) throw { status: 400, message: 'Invalid RefreshToken' };

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/refresh`,
            {
                userId: userId,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`,
                },
                timeout: 30000,
            },
        );

        if (response.status === 200) {
            const { accessToken, refreshToken, auth } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            await store.dispatch('ACT_AUTH', auth);
            localStorage.setItem('userId', userId);
        }

        await window.location.reload();
    } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        await store.dispatch('ACT_AUTH', null);

        await router.replace(`/`);
        return undefined;
    }
};

// 요청 전 처리
apiClient.interceptors.request.use(
    (config) => {
        const { accessToken } = getTokens();

        if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;

        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 전 처리
apiClient.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        const { response } = error;

        if (response.status === 403) {
            const accessToken = await createTokenRefresh();
        } else {
            throw error;
        }
    }
);
