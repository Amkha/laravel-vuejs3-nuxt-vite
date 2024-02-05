import axios, { AxiosError } from 'axios';
interface User {
    name: StaticRange,
    email: string,
    id: number,
    password: string,
    password_confirmation: string,
    two_factor_confirmed_at: Date,
    email_verified_at: Date;
    created_at: Date,
    updated_at: Date,
};
const user = ref<User | null>();
export const useAuth = ()=> {
interface LoginPayload {
    email: String;
    password: string;
  };
async function login(payload: LoginPayload){
    const res = await axios.post("/login", payload);
    console.log(res);
    useRouter().push("/me");
  };
async function logout(){
    await axios.post("/logout");
    user.value = null;
    useRouter().replace("/login");
};
interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string
  };
async function register(payload: RegisterPayload) {
    const res = await axios.post("/register", payload);
    await login({
        email: payload.email,
        password: payload.password,
      });
    
    useRouter().push("/me");
  };

async function initUser(){
    user.value = await getUser();
};
async function getUser(): Promise<User | null>{
    if(user.value) return user.value;
    try {
        const res = await axios.get("/user");
        const user = await res.data;
        return{
            ...user,
            email_verified_at: user.email_verified_at ? new Date(user.email_verified_at) : null,
            two_factor_confirmed_at: user.two_factor_confirmed_at ? new Date(user.two_factor_confirmed_at) : null,
            created_at: new Date(user.created_at),
            updated_at: new Date(user.updated_at),
        }
    }catch(error){
      console.log("error:", error);
      return null;
    }
}


  return {
    login,
    logout,
    register,
    initUser,
    user
  }
}