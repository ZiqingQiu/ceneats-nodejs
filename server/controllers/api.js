// include email function
let nodeMailer = require('nodemailer');

module.exports.sendEmail = () => {
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ceneats@gmail.com',
          pass: 'ceneats201909'
        }
    });
    let mailOptions = {
        from: 'ceneats@gmail.com',
        to: 'qziqing@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<b>NodeJS Email Tutorial</b>' // html body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}