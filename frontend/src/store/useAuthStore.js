import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useChatStore } from "./useChatStore";
import { io } from "socket.io-client";

const BASE_SOCKET_URL = "http://localhost:5000";

// ce code sert à créer le store pour l'authentification
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // ce code sert à vérifier si l'utilisateur est connecté
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in check auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (dataOfTheForm) => {
    set({ isSigningUp: true });
    get().connectSocket();
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
    get().connectSocket();
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
      get().disconnectSocket();
      useChatStore.getState().setSelectedUser(null);
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
  },

// ce code sert à connecter le socket à l'application
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_SOCKET_URL);
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

}));
