import axios from "axios";
import { create } from "zustand";
import { AxiosError } from "axios";
import { SnackBarType, useSnackBar as snackBarStore } from "./snackBarStore";

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

export const useAuth = create<IAuth>()(set => ({
  user: null,
  isUserLoading: true,
  isLogging: false,
  error: null,

  fetchUser: async () => {
    set({ isUserLoading: true });
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await axios.get("/auth/user");
      set({ user: response.data, isUserLoading: false, error: null });
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage = (error.response?.data as any).message;

      set({ user: null, isUserLoading: false, error: errorMessage });
      localStorage.removeItem("accessToken");
      axios.defaults.headers.common["Authorization"] = null;
    }
  },

  login: async (username, password, saveCredentials) => {
    set({ isLogging: true });

    try {
      const response = await axios.post("/auth/login", { username, password });
      const token = response.data.token;
      const user = response.data.user;

      set({ user: user, isLogging: false, error: null });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (saveCredentials) localStorage.setItem("accessToken", token);
    } catch (err) {
      const error = err as AxiosError;
      const responseData = error.response?.data as any;

      set({ isLogging: false, user: null, error: responseData.message });
      snackBarStore.getState().show(responseData.message, SnackBarType.error);
    }
  },

  logout: async () => {
    localStorage.removeItem("accessToken");
    await axios.post("/auth/logout");
    set({ user: null, error: null });
  },
}));
