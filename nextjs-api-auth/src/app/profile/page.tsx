"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const Profile = () => {
   const router = useRouter();

   const [loading, setLoading] = useState(false);
   const [data, setData] = useState({
      _id: "",
      username: "",
      email: "",
   });

   const getUserDetails = async () => {
      try {
         setLoading(true);
         const response = await axios.post("/api/users/me");
         setData(response.data.data);
         setLoading(false);
      } catch (error: any) {
         toast.error(error.message);
      }
   };

   const logoutUser = async () => {
      try {
         const response = await axios.post("/api/users/logout");
         if (response) {
            toast.success("Logout successful");
            router.push("/login");
         }
      } catch (error: any) {
         toast.error(error.message);
      }
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-background">
         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border dark:bg-background flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
            <p className="text-gray-600 mb-4 text-center">
               Click on the button to get user details.
            </p>

            <Button
               disabled={loading}
               className="w-1/2 mb-6"
               onClick={getUserDetails}
            >
               {loading ? (
                  <Skeleton className="h-4 w-full" />
               ) : (
                  <Link href={`/profile/${data._id}`}>Get Details</Link>
               )}
            </Button>

            {data._id.length && (
               <div className="flex flex-col justify-center items-center my-4">
                  <p>ID: {data._id}</p>
                  <p>Username: {data.username}</p>
                  <p>Email: {data.email}</p>
               </div>
            )}

            <Button disabled={loading} className="w-1/2" onClick={logoutUser}>
               {loading ? <Skeleton className="h-4 w-full" /> : "Logout"}
            </Button>
         </div>
      </div>
   );
};

export default Profile;
