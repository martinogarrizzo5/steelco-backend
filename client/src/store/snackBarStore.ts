import { create } from "zustand";

export enum SnackBarType {
  error = "error",
  success = "success",
}

export interface ISnackBar {
  isShown: boolean;
  type: SnackBarType | null;
  message: string | null;
  show: (message: string, type: SnackBarType) => void;
  hide: () => void;
}

export const useSnackBar = create<ISnackBar>()(set => ({
  message: null,
  type: null,
  isShown: false,

  show: (message: string, type: SnackBarType) => {
    set({ isShown: true, message, type });
  },
  hide: () => {
    set({ isShown: false, message: null, type: null });
  },
}));
