export const otpTemplates = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email</title>
    <link
      href="https://api.fontshare.com/v2/css?f[]=poppins@500,400,200,600&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "Poppins", Courier, monospace;
      }
    </style>
  </head>
  <body style="max-width: 60%; margin: 0 auto">
    <p>Hi <span style="font-weight: bold">{{username}},</span> Your email verification code is
      <span style="color: red; font-weight: bold">{{otp}}</span> </p>
    <p>This verification code will last for 15 minutes</p>
  </body>
</html>
`;
