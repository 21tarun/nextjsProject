import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import {useRouter} from "next/navigation";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email2} = reqBody

        console.log(email2);

        //check if user already exists
        const user = await User.findOne({email:email2})

        if(!user){
            return NextResponse.json({status:false,message:"user not exist"})
            
        }

        
   

        

        //send verification email

        await sendEmail({email:email2, emailType: "RESET", userId: user._id})
        console.log("emailsend")

        return NextResponse.json({
            message: "Email Sent Success",
            status: true

        })
        
        


    } catch (error: any) {
        return NextResponse.json({status:false,message: error.message})

    }
}