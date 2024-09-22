import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import axios from "axios";
import {LoginInputState} from "@/schema/userSchema";
import {toast} from "sonner";

const API_END_POINT = "http://localhost:3000/api/v1/users"
axios.defaults.withCredentials = true;

export interface User {
  username: string;
  fullName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  isVerified: boolean;
  token: string
}

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  login: (input: LoginInputState) => Promise<void>;
}

export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,
    login: async (input: LoginInputState) => {
      try {
        set({loading: true});
        const response = await axios.post(`${API_END_POINT}/login`, input, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.data.success) {
          response.data.message = 'Logged in'
          toast.success(response.data.message);
          set({loading: false, user: response.data.data, isAuthenticated: true});
        }
      } catch (error: any) {
        console.log(error)
        toast.error(error.response.data.message);
        set({loading: false});
      }
    },
  }),
  {
    name: 'user-name',
    storage: createJSONStorage(() => localStorage),
  }
))