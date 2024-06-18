"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const Login = () => {
   const router = useRouter();

   const [user, setUser] = useState({
      email: "",
      password: "",
   });

   const [buttonDisabled, setButtonDisabled] = useState(false);
   const [loading, setLoading] = useState(false);

   const handleLogin = async () => {
      try {
         setLoading(true);
         const response = await axios.post("/api/users/login", user);
         console.log(response);
         if (response.data.success) {
            toast.success("Login successful");
            router.push("/profile");
         } else {
            toast.error("Something went wrong");
            setLoading(false);
         }
      } catch (error: any) {
         toast.error(error.message);
      }
   };

   useEffect(() => {
      if (user.email.length > 0 && user.password.length > 0) {
         setButtonDisabled(false);
      } else {
         setButtonDisabled(true);
      }
   }, [user]);

   return loading ? (
      <div className="flex justify-center items-center min-h-screen">
         <div className="flex flex-col space-y-3 m-auto">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
               <Skeleton className="h-4 w-[250px]" />
               <Skeleton className="h-4 w-[200px]" />
            </div>
         </div>
      </div>
   ) : (
      <div className="flex justify-center items-center min-h-screen">
         <Card className="mx-auto max-w-sm">
            <CardHeader>
               <CardTitle className="text-2xl">Login</CardTitle>
               <CardDescription>
                  Enter your email below to login to your account
               </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid gap-4">
                  <div className="grid gap-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                           setUser({ ...user, email: e.target.value })
                        }
                        placeholder="m@example.com"
                        required
                     />
                  </div>
                  <div className="grid gap-2">
                     <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                           href="#"
                           className="ml-auto inline-block text-sm underline"
                        >
                           Forgot your password?
                        </Link>
                     </div>
                     <Input
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) =>
                           setUser({ ...user, password: e.target.value })
                        }
                        required
                     />
                  </div>
                  <Button
                     type="submit"
                     className="w-full"
                     disabled={buttonDisabled}
                     onClick={handleLogin}
                  >
                     Login
                  </Button>
               </div>
               <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline">
                     Sign up
                  </Link>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default Login;
