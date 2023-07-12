"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";






export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [email2,setEmail2]=React.useState("")
    const [forgotPass,setForgotPass]=React.useState(false)
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const toastOptions:any = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };


    const onLogin = async () => {
        try {
            setLoading(true);
            const response:any = await axios.post("/api/users/login", user);
            console.log("Login success", response);
            if(response.data.status==true){
                toast.success(response.data.message, toastOptions);
                setTimeout(()=>router.push("/profile"),1000)

            }
            else{
                toast.error(response.data.message, toastOptions);
                // alert("error")
            }
            
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error, toastOptions);
            
        } finally{
        setLoading(false);
        }
    }
    const forgotPassword =async()=> {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", {email2});
            toast.success("Email sent Successfully", toastOptions);

            console.log("Email sent Successfully", response.data);
            setTimeout(()=>setForgotPass(false),1500)
            

        }
        catch(error:any){
            console.log("email send failed", error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        
        forgotPass==false?
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <a onClick={()=>setForgotPass(true)}>Forgot Password</a>
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            <Link href="/signup">Visit Signup page</Link>
            <ToastContainer />

        </div>:
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Send An Email"}</h1>
            <hr />

            <label htmlFor="email">email</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                placeholder="email"
            />
            <button
            onClick={forgotPassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Submit</button>
            <ToastContainer />

        </div>
        
    )

}