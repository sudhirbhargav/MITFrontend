import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartItem, CartItems, User } from "../types";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  CartItems: CartItem[] | null;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems[] | CartItems>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const apiKey = import.meta.env.VITE_API_KEY;
import { name } from './../../node_modules/react-spinners/dist/storybook/sb-addons/essentials-controls-2/manager-bundle';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [CartItems, setCartItems] = useState<CartItems[] | null>(null);
  const [loading, setLoading] = useState(true); // Added loading state
  let [color, setColor] = useState("#ffffff");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split(".")[1]));
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          Token: token,
        });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false); // Set loading to false once token is checked
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${apiKey}api/auth/login`, {
        email,
        password,
      });
      const { token, user: userData } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("UserName",userData.username)

      setUser({
        id: userData.id,
        email: userData.email,
        name: userData.username,
        Token: token,
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("UserName")
    
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${apiKey}api/auth/signup`, {
        username,
        email,
        password,
      });
      if (response.data.message !== "User registered successfully!") {
        throw new Error("User did not register successfully!");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        isAuthenticated: !!user,
        CartItems,
        setCartItems,
      }}
    >
      {loading ? (
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        children
      )}{" "}
      {/* Show loading state until token check is done */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
