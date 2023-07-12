'use client'
import React from "react"
import axios from "axios"

interface UserData {
    username: string;
    email: string;
}
export default function UserProfile({params}: any) {
    
    let [data,setData]=React.useState<UserData>({} as UserData)
    React.useEffect(()=>{
      const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data)
      }
      getUserDetails()
    },[])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page of
            <span className=" p-2 ml-2 rounded bg-orange-500 text-black">{data.username}</span>
            </p><br></br>
            <p>emailId is : {data.email}</p>

            </div>
    )
}