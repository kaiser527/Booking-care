require("dotenv").config();
import nodemailer from "nodemailer";

const sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: 'Kaiser 👻" <minh.hacker89@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: getBodyHTMLEmail(dataSend),
  });
};

const getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "en") {
    result = `
      <h3>Dear ${dataSend.patientName}!</h3>
      <p>You received this email because you booked an online medical appointment on BookingCare</p>
      <p>Appointment information:</p>
      <div><b>Time: ${dataSend.time}</b></div>
      <div><b>Doctor: ${dataSend.doctorName}</b></div>

      <p>If the above information is true, please click the link below to confirm and complete the appointment procedure.</p>
      <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>

      <div>Thanks so much!</div>
    `;
  }
  if (dataSend.language === "vi") {
    result = `
      <h3>Xin chào ${dataSend.patientName}!</h3>
      <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
      <p>Thông tin đặt lịch khám bệnh:</p>
      <div><b>Thời gian: ${dataSend.time}</b></div>
      <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

      <p>Nếu các thông tin trên là đúng là sự thật, vui lòng click đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
      <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>

      <div>Xin chân thành cảm ơn!</div>
    `;
  }
  return result;
};

export { sendSimpleEmail };
