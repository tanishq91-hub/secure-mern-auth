export const getOtpHtml = ({ email, otp }) => {
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>{{APP_NAME}} Verification Code</title>
    <style>
      /* Base reset */
      html,
      body {
        margin: 0;
        padding: 0;
      }
      body {
        background: #eef1f7;
        color: #111;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol", sans-serif;
      }
      table {
        border-collapse: collapse;
      }
      img {
        border: 0;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        display: block;
        max-width: 100%;
        height: auto;
      }

      /* Layout */
      .wrapper {
        width: 100%;
        background: #eef1f7;
      }
      .container {
        width: 600px;
        max-width: 600px;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid #e6e9f2;
        box-shadow: 0 2px 10px rgba(17, 24, 39, 0.04);
      }
      .p-32 {
        padding: 32px;
      }

      /* Header */
      .header {
        background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
        padding: 28px 24px 24px 24px;
        text-align: center;
      }
      .brand {
        display: inline-block;
        color: #ffffff;
        font-weight: 700;
        font-size: 16px;
        letter-spacing: 0.4px;
        text-decoration: none;
        margin-bottom: 18px;
      }

      /* Icon badge */
      .icon-badge {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.14);
      }

      .title {
        margin: 0 0 12px 0;
        font-size: 21px;
        line-height: 1.35;
        color: #111;
        font-weight: 700;
      }
      .title .email {
        color: #4f46e5;
        word-break: break-all;
      }
      .text {
        margin: 0 0 24px 0;
        font-size: 15px;
        line-height: 1.6;
        color: #4b5563;
      }
      .muted {
        color: #6b7280;
        font-size: 13.5px;
        line-height: 1.6;
        margin: 0 0 8px 0;
      }
      .divider {
        border: none;
        border-top: 1px solid #eef0f5;
        margin: 24px 0;
      }

      /* OTP badge */
      .otp-wrap {
        margin: 0 0 24px 0;
        width: 100%;
      }
      .otp {
        display: inline-block;
        background: #f5f6fb;
        border: 1.5px dashed #c7cce0;
        border-radius: 12px;
        padding: 16px 28px;
        font-size: 34px;
        letter-spacing: 12px;
        font-weight: 700;
        color: #111827;
        font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }

      /* Footer */
      .footer {
        text-align: center;
        color: #9ca3af;
        font-size: 12px;
        line-height: 1.6;
        padding: 20px 24px 28px 24px;
      }

      /* Responsive */
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
          border-radius: 0 !important;
        }
        .p-32 {
          padding: 24px !important;
        }
        .otp {
          font-size: 26px !important;
          letter-spacing: 8px !important;
          padding: 14px 18px !important;
        }
      }
    </style>
  </head>
  <body>
    <table
      role="presentation"
      class="wrapper"
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
    >
      <tr>
        <td align="center" class="p-32">
          <table
            role="presentation"
            class="container"
            border="0"
            cellspacing="0"
            cellpadding="0"
          >
            <!-- Header -->
            <tr>
              <td class="header">
                <span class="brand">Authentication App</span>

                <!-- Icon badge (inline SVG - never breaks, no external request) -->
                <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                  <tr>
                    <td class="icon-badge" align="center" valign="middle">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L4 5v6c0 5 3.4 8.9 8 10 4.6-1.1 8-5 8-10V5l-8-3z" stroke="#ffffff" stroke-width="1.6" stroke-linejoin="round"/>
                        <path d="M8.5 12.2l2.4 2.4 4.6-4.8" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="p-32">
                <h1 class="title">Verify your email</h1>
                <p class="text">
                  Use the verification code below to complete your sign-in to
                  Authentication App as <span class="email">${email}</span>.
                </p>

                <!-- OTP -->
                <table
                  role="presentation"
                  class="otp-wrap"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tr>
                    <td align="center">
                      <div class="otp">${otp}</div>
                    </td>
                  </tr>
                </table>

                <p class="muted">
                  This code will expire in <strong>5 minutes</strong>.
                </p>
                <hr class="divider" />
                <p class="muted">
                  If this wasn’t you, this email can be safely ignored — no
                  changes will be made to your account.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="footer">© 2025 Authentication App. All rights reserved.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
    return html;
};

export const getVerifyEmailHtml = ({ email, token }) => {
    const appName = process.env.APP_NAME || "Authentication App";
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const verifyUrl = `${baseUrl.replace(/\/+$/, "")}/token/${encodeURIComponent(
        token,
    )}`;

    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${appName} Verify Your Account</title>
    <style>
      /* Base reset */
      html,
      body {
        margin: 0;
        padding: 0;
      }
      body {
        background: #eef1f7;
        color: #111;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol", sans-serif;
      }
      table {
        border-collapse: collapse;
      }
      img {
        border: 0;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        display: block;
        max-width: 100%;
        height: auto;
      }

      /* Layout */
      .wrapper {
        width: 100%;
        background: #eef1f7;
      }
      .container {
        width: 600px;
        max-width: 600px;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid #e6e9f2;
        box-shadow: 0 2px 10px rgba(17, 24, 39, 0.04);
      }
      .p-32 {
        padding: 32px;
      }

      /* Header */
      .header {
        background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
        padding: 28px 24px 24px 24px;
        text-align: center;
      }
      .brand {
        display: inline-block;
        color: #ffffff;
        font-weight: 700;
        font-size: 16px;
        letter-spacing: 0.4px;
        text-decoration: none;
        margin-bottom: 18px;
      }

      /* Icon badge */
      .icon-badge {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.14);
      }

      .title {
        margin: 0 0 12px 0;
        font-size: 21px;
        line-height: 1.35;
        color: #111;
        font-weight: 700;
      }
      .title .email {
        color: #4f46e5;
        word-break: break-all;
      }
      .text {
        margin: 0 0 24px 0;
        font-size: 15px;
        line-height: 1.6;
        color: #4b5563;
      }
      .muted {
        color: #6b7280;
        font-size: 13.5px;
        line-height: 1.6;
        margin: 0 0 8px 0;
      }
      .divider {
        border: none;
        border-top: 1px solid #eef0f5;
        margin: 24px 0;
      }

      /* Button */
      .btn-wrap {
        margin: 4px 0 24px 0;
      }
      .btn {
        display: inline-block;
        background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
        color: #ffffff !important;
        text-decoration: none;
        padding: 14px 32px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 15px;
      }

      /* Footer */
      .footer {
        text-align: center;
        color: #9ca3af;
        font-size: 12px;
        line-height: 1.6;
        padding: 20px 24px 28px 24px;
      }

      /* Link fallback */
      .link {
        color: #4f46e5;
        text-decoration: underline;
        word-break: break-all;
        font-size: 13px;
      }

      /* Responsive */
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
          border-radius: 0 !important;
        }
        .p-32 {
          padding: 24px !important;
        }
        .btn {
          display: block !important;
          padding: 14px 0 !important;
        }
      }
    </style>
  </head>
  <body>
    <table
      role="presentation"
      class="wrapper"
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
    >
      <tr>
        <td align="center" class="p-32">
          <table
            role="presentation"
            class="container"
            border="0"
            cellspacing="0"
            cellpadding="0"
          >
            <!-- Header -->
            <tr>
              <td class="header">
                <span class="brand">${appName}</span>

                <!-- Icon badge (inline SVG - never breaks, no external request) -->
                <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                  <tr>
                    <td class="icon-badge" align="center" valign="middle">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="10.5" width="16" height="10" rx="2" stroke="#ffffff" stroke-width="1.6"/>
                        <path d="M7.5 10.5V7.5a4.5 4.5 0 0 1 9 0v3" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round"/>
                        <circle cx="12" cy="15" r="1.6" fill="#ffffff"/>
                      </svg>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="p-32">
                <h1 class="title">Verify your account</h1>
                <p class="text">
                  Thanks for registering with ${appName} as
                  <span class="email">${email}</span>. Click the button below
                  to confirm it's you and activate your account.
                </p>

                <!-- Button -->
                <table
                  role="presentation"
                  class="btn-wrap"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tr>
                    <td align="center">
                      <a
                        class="btn"
                        href="${verifyUrl}"
                        target="_blank"
                        rel="noopener"
                        >Verify account</a
                      >
                    </td>
                  </tr>
                </table>

                <p class="muted">
                  If the button doesn’t work, copy and paste this link into
                  your browser:
                </p>
                <p class="muted">
                  <a class="link" href="${verifyUrl}" target="_blank" rel="noopener"
                    >${verifyUrl}</a
                  >
                </p>
                <hr class="divider" />
                <p class="muted">
                  If this wasn’t you, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="footer">
                © ${new Date().getFullYear()} ${appName}. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
    return html;
};
