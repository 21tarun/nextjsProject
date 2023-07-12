"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


export default function ResetPasswordPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    const toastOptions:any = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const resetpasswordEmail = async () => {

        try {
                
            if(token.length<=0)return toast.error("missin token", toastOptions);
            if(!newPassword || !confirmPassword)return toast.error("please fill mandatory fields", toastOptions);
            if(newPassword!=confirmPassword)return toast.error("password are not matching", toastOptions);
            await axios.post('/api/users/resetpassword', {token,newPassword})
            setVerified(true);
            toast.success("password reset successfully", toastOptions);
        } catch (error:any) {
            setError(true);
            toast.error(error.reponse.data, toastOptions);
            console.log(error.reponse.data);
            
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);




    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Reset Your Password</h1>
            <input className="text-black" type="password" placeholder="newPassword" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/><br></br>
            <input className="text-black" type="password" placeholder="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <button onClick={resetpasswordEmail}>submit</button>

            {/* <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2> */}

            {verified && (
                <div>
                    <h2 className="text-2xl">your password has been updated</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
            )}
            <ToastContainer />

        </div>
    )

}