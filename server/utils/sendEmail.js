// server/utils/sendEmail.js
const sgMail = require('@sendgrid/mail');

// Set the API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (email, name) => {
  const msg = {
    to: email, // The new user's email address
    from: process.env.FROM_EMAIL, // Your verified sender email
    subject: '🎉 Welcome to Makaut Archives!',
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #4A5568;">Hi ${name},</h1>
        <p>Welcome to <strong>Makaut Archives</strong>! We are thrilled to have you join our community of students and professors.</p>
        <p>You can now log in to explore and share notes, and prepare for your exams with our resources.</p>
        <p>Best of luck with your studies!</p>
        <p><em>The Makaut Archives Team</em></p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // We log the error but don't stop the registration process
  }
};

module.exports = sendWelcomeEmail;