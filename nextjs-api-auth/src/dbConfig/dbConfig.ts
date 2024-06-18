import mongoose from "mongoose";

export const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URL!);
      const connection = mongoose.connection;

      connection.on("connected", () => {
         console.log(`MONGODB Connected!! HOST: ${connection.host}`);
      });

      connection.on("error", (err) => {
         console.log("ERROR :: MONGODB Connection error :: ", err);
         process.exit();
      });
   } catch (error) {
      console.log(
         "ERROR :: Something went wrong while connecting MONGODB :: ",
         error
      );
   }
};
