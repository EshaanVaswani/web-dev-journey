import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/models/user.model";

connectDB();

export const POST = async (req: NextRequest) => {
   try {
      const { email, password } = await req.json();

      // check if user exists
      const user = await User.findOne({ email });

      if (!user) {
         return NextResponse.json(
            { error: "User doesn't exist" },
            { status: 400 }
         );
      }

      // check if password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
         return NextResponse.json(
            { error: "Invalid password" },
            { status: 400 }
         );
      }

      // create token
      const token = jwt.sign(
         { id: user._id, username: user.username, email: user.email },
         process.env.TOKEN_SECRET!,
         {
            expiresIn: "1d",
         }
      );

      const response = NextResponse.json({
         message: "User logged in successfully",
         success: true,
      });

      // set cookies
      response.cookies.set("token", token, { httpOnly: true });

      return response;
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
   }
};
