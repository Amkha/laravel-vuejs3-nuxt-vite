import axios from "axios";
export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig();
    axios.defaults.baseURL =`${config.public.appURL}/api`;
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.withCredentials = true;

    //incase session is expired or
    axios.interceptors.response.use(
        (res) => res,
        (error) =>{
            if([401,409].includes(error.response.status) && (!error.request.responseURL.endsWith("/api/user")) ){
                const { logout } = useAuth();
                logout();
            }else{
                return Promise.reject(error);
            }
        },
    );


    // await axios.get("/sanctum/csrf-cookie");
    await axios.get("/sanctum/csrf-cookie", {
        baseURL : config.public.appURL,
    });
});