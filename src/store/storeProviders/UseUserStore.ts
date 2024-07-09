import create from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  username?: string;
  firstName?: string;
  lastaName?: string;
  profile?: string;
  name?: string;
  email: string;
  image?: string;
  password?: string;
  isInstructor?: boolean;
  _id?:any
};

type UserStore = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginSuccess: (payload: User) => void;
  logoutSuccess: () => void;
  setOAuthMode: (payload: any) => void;
  oAuthMode: "signup" | "login";
  isAuth: boolean;
  setIsAuthMode: () => void;
  googleAuthSucess:(payload: User) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      isAuth: false,
      isAuthenticated: false,
      oAuthMode: "signup",
      loginSuccess: (payload: User) => {
        set((state) => ({
          user: payload,
        }));
      },
      googleAuthSucess: (payload: User) => {
        set((state) => ({
          user: payload,
          isAuth:true,
          isAuthenticated:true
        }));
      },
      setIsAuthMode: () => {
        set((state) => ({
          isAuth: true,
          isAuthenticated: true,
        }));
      },
      logoutSuccess: () => {
        set((state) => ({
          user: null,
          isAuthenticated: false,
          oAuthMode: "signup",
          isAuth: false,
        }));
        localStorage.removeItem("user-storage");
      },
      setOAuthMode: (payload) => {
        set((state) => ({
          oAuthMode: payload,
        }));
      },
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);
