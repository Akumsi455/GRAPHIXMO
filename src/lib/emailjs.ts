import emailjs from "@emailjs/browser";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export function isEmailJsConfigured() {
  return Boolean(serviceId && templateId && publicKey);
}

export async function sendVerificationCode({
  email,
  name,
  code,
}: {
  email: string;
  name: string;
  code: string;
}) {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error("Email verification is not configured yet. Add the EmailJS environment variables.");
  }

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
