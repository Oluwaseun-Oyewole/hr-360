import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import { activationTemplate } from "./email-template/activation";
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
  const { SMTP_EMAIL, SMTP_GMAIL_PASS, HOST, SERVICE } = process.env;

  const transport = nodemailer.createTransport({
    service: SERVICE,
    host: HOST,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_GMAIL_PASS,
    },
  });

  //   try {
  //     await transport.verify();
  //   } catch (error) {
  //     return null;
  //   }

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
