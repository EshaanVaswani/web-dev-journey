import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { User } from "@/models/user.model";

export const sendEmail = async ({ email, emailType, userId }: any) => {
   try {
      const hashedToken = await bcrypt.hash(userId.toString(), 10);

      let message, link;
      if (emailType === "VERIFY") {
         message = "verify your account";
         link = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;

         await User.findByIdAndUpdate(
            userId,
            {
               verifyToken: hashedToken,
               verifyTokenExpiry: Date.now() + 3600000,
            },
            {
               new: true,
            }
         );
      } else if (emailType === "RESET") {
         message = "reset your password";
         link = `${process.env.DOMAIN}/forgotpassword?token=${hashedToken}`;

         await User.findByIdAndUpdate(
            userId,
            {
               forgotPasswordToken: hashedToken,
               forgotPasswordTokenExpiry: Date.now() + 3600000,
            },
            { new: true }
         );
      }

      const transport = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
         port: 587,
         auth: {
            user: process.env.NODEMAILER_USERNAME,
            pass: process.env.NODEMAILER_PASSWORD,
         },
      });

      const mailOptions = {
         from: "ev@eshaan.ai",
         to: email,
         subject:
            emailType === "VERIFY"
               ? "Verify your account"
               : emailType === "RESET"
               ? "Reset your password"
               : "",
         html: `<p>Click <a href=${link}> here </a> to ${message} or copy and paste the below link in the browser. <br /> ${link} </p>`,
      };

      const response = await transport.sendMail(mailOptions);

      return response;
   } catch (error: any) {
      throw new Error(error.message);
   }
};
