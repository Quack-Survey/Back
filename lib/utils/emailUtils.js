const nodemailer = require("nodemailer");

const { EMAIL_HOST, USERNAME, PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: USERNAME,
    pass: PASSWORD,
  },
});

const sendJoinMail = async (to, verifyCode) => {
  transporter.sendMail({
    from: '"no-reply" <no-reply@oscar0421.com>',
    to,
    subject: "이메일 인증을 완료해 주세요.",
    html: `<p>아래 링크를 클릭해 회원가입을 완료해주세요.</p> <a href='http://localhost:3000/verify/${verifyCode}'>인증하기</a>`,
  });
};

const sendFindMail = async (to, verifyCode) => {
  transporter.sendMail({
    from: '"no-reply" <no-reply@oscar0421.com>',
    to,
    subject: "비밀번호 변경 메일입니다.",
    html: `<p>아래 링크를 클릭해 비밀번호를 변경해주세요.</p> <a href='http://localhost:3000/password/${verifyCode}'>변경하기</a>`,
  });
};

module.exports = { sendJoinMail, sendFindMail };
