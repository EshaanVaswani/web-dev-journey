import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { User } from "@/models/user.model";

connectDB();

export const POST = async (req: NextRequest) => {
   //extract data from token
   const userId = await getDataFromToken(req);

   const user = await User.findById(userId).select("-password");

   //check if there is no user
   if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
   }

   return NextResponse.json({ message: "User found", data: user });
};
