import React from "react";

const ProfilePage = ({ params }: any) => {
   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-background">
         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border dark:bg-background flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
            <p className="text-white text-center">{params.id}</p>
         </div>
      </div>
   );
};

export default ProfilePage;
