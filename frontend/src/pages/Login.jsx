import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    console.log(import.meta.env.VITE_BACKEND);
    const navigate = useNavigate();

    const handleSuccess = async (response) => {
        try {
            const { credential } = response;
            const res = await axios.post(`${import.meta.env.VITE_BACKEND}/auth/google`, {
                token: credential,
            }, { withCredentials: true });

            console.log("User data:", res.data);
            navigate("/");  // Redirect after login
        } catch (error) {
            console.error("Login Failed", error);
        }
    };

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
            <div>
                <h2>Login With Google</h2>
                <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} />
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
