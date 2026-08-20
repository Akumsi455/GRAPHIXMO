import emailjs from "@emailjs/browser";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export function isEmailJsConfigured() {
  return Boolean(serviceId && templateId && publicKey);
}

// Generates a fresh random 7-digit code every time it's called.
export function generateVerificationCode(): string {
  return String(Math.floor(1000000 + Math.random() * 9000000));
}

export async function sendVerificationCode({
  email,
  name,
  code,
  expiresAt,
}: {
  email: string;
  name: string;
  code: string;
  expiresAt: number;
}) {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error("Email verification is not configured yet. Add the EmailJS environment variables.");
  }

  const time = new Date(expiresAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  try {
    return await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: email,
        to: email,
        email,
        user_email: email,
        to_name: name,
        name,
        user_name: name,
        otp_code: code,
        verification_code: code,
        code,
        passcode: code, // matches {{passcode}} in your EmailJS template
        time,            // matches {{time}} in your EmailJS template
        app_name: "GraphixMo",
        message: `Your GraphixMo verification code is ${code}.`,
      },
      { publicKey },
    );
  } catch (error) {
    if (typeof error === "object" && error !== null && "status" in error && "text" in error) {
      const emailJsError = error as { status: number; text: string };
      throw new Error(`EmailJS ${emailJsError.status}: ${emailJsError.text}`);
    }
    throw error;
  }
}