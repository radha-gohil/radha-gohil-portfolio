import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React dist folder (for production)
app.use(express.static(path.join(__dirname, 'dist')));

// API Endpoint for Contact Form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }

  try {
    let transporter;

    // Check if real email credentials are provided in environmental variables
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      console.log('Using production SMTP settings.');
    } else {
      // Fallback: Generate a test SMTP service from ethereal.email
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log('Using Ethereal SMTP fallback settings.');
    }

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'radhagohil999@gmail.com', // Recipient address
      replyTo: email,
      subject: `Portfolio Contact: Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-line; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    if (!process.env.EMAIL_USER) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`[TEST INBOX] Email Sent! View preview at: ${previewUrl}`);
      return res.status(200).json({
        message: `Message simulated successfully. Since no production email credentials were set, you can view the sent email in the console log link: ${previewUrl}`,
        previewUrl,
      });
    }

    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

// All other GET requests serve React build index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
