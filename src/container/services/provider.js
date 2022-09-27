import { useEffect } from 'react'
import axios from "axios";
import { useUserState } from "../state/store";

const instance = axios.create({
    baseURL: "https://better-zipper-lion.cyclic.app/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

const AxiosInterceptor = ({ children }) => {
    const token = useUserState((state) => state.token)
    const setToken = useUserState((state) => state.setToken);
    const refreshToken = useUserState((state) => state.refreshToken);

    useEffect(() => {
        instance.interceptors.request.use(
            (config) => {
                if (token && token !== null) {
                    config.headers["authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
                    // config.headers["x-access-token"] = token; // for Node.js Express back-end
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        instance.interceptors.response.use(
            (res) => {
                return res;
            },
            async (err) => {
                const originalConfig = err.config;
                // console.log(err)
                if (originalConfig.url !== "/auth/signin" && err.response) {
                    // Access Token was expired
                    if ((err.response.status === 401 || err.response.status === 500) && originalConfig._retry) {
                        console.log('i am here again')
                        originalConfig._retry = true;
                        try {
                            const rs = await instance.post("/auth/refresh-token", {
                                refreshToken: refreshToken,
                            });
                            const { accessToken } = rs.data;
                            setToken(accessToken);
                            return instance(originalConfig);
                        } catch (_error) {
                            console.log(_error)
                            return Promise.reject(_error);
                        }
                    }
                }
                return Promise.reject(err);
            }
        );
    }, [token, refreshToken, setToken])

    return children;
}

export default instance;
export { AxiosInterceptor }