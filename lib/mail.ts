import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import { activationTemplate } from "./email-template/activation";
import { otpTemplate } from "./email-template/otp";
import { resetPasswordTemplate } from "./email-template/reset-password";

export async function sendMail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD, SMTP_HOST } = process.env;

  const transport = nodemailer.createTransport({
    // service: SERVICE,
    host: SMTP_HOST,
    port: 587,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
  } catch (error) {
    return null;
  }
}

export const compileOTPVerificationTemplate = (
  username: string,
  otp: number
) => {
  const template = Handlebars.compile(otpTemplate);
  const htmlBody = template({
    username,
    otp,
  });
  return htmlBody;
};

export const compileActivationTemplate = (name: string, url: string) => {
  const template = Handlebars.compile(activationTemplate);
  const htmlBody = template({
    name,
    url,
  });
  return htmlBody;
};

export const compileResetPasswordTemplate = (name: string, url: string) => {
  const template = Handlebars.compile(resetPasswordTemplate);
  const htmlBody = template({
    name,
    url,
  });
  return htmlBody;
};
