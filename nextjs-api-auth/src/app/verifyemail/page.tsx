"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import toast from "react-hot-toast";

const Verify = () => {
   const [loading, setLoading] = useState(false);
   const [token, setToken] = useState("");
   const [verified, setVerified] = useState(false);

   const handleVerify = async () => {
      try {
         if (token) {
            const response = await axios.post("api/users/verifyemail", {
               token,
            });
            if (response) {
               toast.success("Verification successful");
               setVerified(true);
               setLoading(false);
            }
         }
      } catch (error: any) {
         toast.error(error.response.data);
      }
   };

   useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      console.log(urlToken);

      setToken(urlToken);
   }, []);

   // useEffect(() => {
   //    if (token.length > 0) {
   //       handleVerify();
   //    }
   // }, [token]);

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-background">
         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border dark:bg-background">
            <h1 className="text-2xl font-bold mb-4 text-center">
               Verify Your Account
            </h1>
            <p className="text-gray-600 mb-4 text-center">
               Click on the button to verify your email.
            </p>

            <Button
               onClick={handleVerify}
               disabled={loading}
               className="w-full"
            >
               {loading ? <Skeleton className="h-4 w-full" /> : "Verify email"}
            </Button>

            {verified && (
               <div className="mt-6">
                  <h1 className="text-2xl font-bold mb-4 text-center">
                     Verified :)
                  </h1>
                  <p className="text-gray-600 mb-4 text-center">
                     {token ? token : ""}
                  </p>
               </div>
            )}
         </div>
      </div>
   );
};

export default Verify;
