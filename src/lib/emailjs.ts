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

  return emailjs.send(
    serviceId,
    templateId,
    {
      to_email: email,
      to_name: name,
      otp_code: code,
      app_name: "GraphixMo",
    },
    { publicKey },
  );
}
