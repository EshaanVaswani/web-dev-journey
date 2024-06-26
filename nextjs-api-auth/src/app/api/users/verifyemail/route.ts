import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const POST = async (req: NextRequest) => {
   try {
      const { token } = await req.json();

      // find user from db
      const user = await User.findOne({
         verifyToken: token,
         verifyTokenExpiry: { $gt: Date.now() },
      });

      if (!user) {
         return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
      }

      // verify the user
      user.isVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;

      await user.save();

      return NextResponse.json({
         message: "Email verified successfully",
         success: true,
      });
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
};
