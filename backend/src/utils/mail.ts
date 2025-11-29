import { Resend } from 'resend';
import config from '../config/index';

export const sendOTP = async (email: string, otp: string) => {
  const resend = new Resend(config.RESEND_API_KEY);

  const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333; margin-bottom: 10px;">Password Reset Request</h1>
            <p style="color: #666; font-size: 16px;">We received a request to reset your password</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin: 30px 0;">
            <p style="color: white; margin: 0 0 15px 0; font-size: 18px;">Your verification code is:</p>
            <div style="background: white; display: inline-block; padding: 15px 30px; border-radius: 8px; margin: 10px 0;">
                <span style="font-size: 32px; font-weight: bold; color: #333; letter-spacing: 5px;">${otp}</span>
            </div>
            <p style="color: white; margin: 15px 0 0 0; font-size: 14px;">This code will expire in 3 minutes</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Security Tips:</h3>
            <ul style="color: #666; margin: 0; padding-left: 20px;">
                <li>Never share this code with anyone</li>
                <li>We will never ask for this code via phone or email</li>
                <li>If you didn't request this, please ignore this email</li>
            </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px; margin: 0;">
                This is an automated message, please do not reply to this email.
            </p>
            </div>
        </div>
  `;

  const text = `Your password reset OTP is: ${otp}. This code will expire in 10 minutes. If you didn't request this, please ignore this email.`;

  try {
    const {data, error} = await resend.emails.send({
      from: `"Call Of Code" <${config.EMAIL_ID}>`, 
      to: email,
      subject: 'Password Reset OTP - Call Of Code',
      html,
      text,
    });


    if (error) {
        throw new Error(
            typeof error === 'string' ? error : JSON.stringify(error)
        );
    }
    
    return data;
  } catch (error) {
    throw error; 
  }
};
