import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export const POST = async (req: NextRequest) => {
   try {
      const { username, email, password } = await req.json();

      // find if user already exists
      const user = await User.findOne({ email });

      if (user) {
         return NextResponse.json(
            { error: "User already exists" },
            { status: 400 }
         );
      }

      // hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create new user in db
      const newUser = await User.create({
         username,
         email,
         password: hashedPassword,
      });

      // send verification mail
      await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

      return NextResponse.json({
         message: "User created successfully",
         success: true,
         newUser,
      });
   } catch (error: any) {
      return NextResponse.json({ error: error.message, status: 500 });
   }
};
