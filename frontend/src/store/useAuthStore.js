import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in check auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (dataOfTheForm) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", dataOfTheForm);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      console.log("Error in signup", error);
      toast.error("Error in signup");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (dataOfTheForm) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", dataOfTheForm);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      console.log("Error in login", error);
      toast.error("Error in login");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Error in logout", error);
      toast.error("Error in logout");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile", error);
      toast.error("Error in update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
}));