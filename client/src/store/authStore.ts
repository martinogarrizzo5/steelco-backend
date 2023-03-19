import axios from "axios";
import { create } from "zustand";
import { AxiosError } from "axios";

interface IUser {
  id: number;
  username: string;
}

interface IAuth {
  user: IUser | null;
  isUserLoading: boolean;
  isLogging: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  login: (
    username: string,
    password: string,
    saveCredentials: boolean
  ) => Promise<void>;
  logout: () => void;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useAuth = create<IAuth>()((set) => ({
  user: null,
  isUserLoading: true,
  isLogging: false,
  error: null,

  fetchUser: async () => {
    set({ isUserLoading: true });
    const token = localStorage.getItem("token");
    if (!token) return set({ isUserLoading: false, user: null });

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.get("/auth/user");
      set({ user: response.data, isUserLoading: false, error: null });
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage = (error.response?.data as any).error;

      set({ user: null, isUserLoading: false, error: errorMessage });
      localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = null;
    }
  },

  login: async (username, password, saveCredentials) => {
    set({ isLogging: true });
    // api request
    try {
      const response = await axios.post("/login", { username, password });
      const token = response.data.token;
      const user = response.data.user;

      set({ user: user, isLogging: false, error: null });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (saveCredentials) localStorage.setItem("token", token);
    } catch (err) {
      const error = err as AxiosError;
      set({ isLogging: false, user: null });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, error: null });
  },
}));
