const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const transport = nodemailer.createTransport({
  host: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "info@example.com",
    pass: "yourPWD",
  },
});

app.post("/sendEmail", (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: "info@example.com",
    to: "info@example.com",
    subject: "Message to you from " + name + " :- " + subject,
    text: "Name:- " + name + "\nEmail:- " + email + "\nMessage:- " + message,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

const port = process.env.PORT || 8071;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
