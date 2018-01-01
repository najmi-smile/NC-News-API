// const {mailConfig} = require('../config')
const nodemailer = require('nodemailer');

module.exports = (req, res) => {
  res.json(req.body);
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li> Name: Tahir</li>
      <li> Traits: company</li>
      <li> Percentile: percentile</li>    
    </ul>
    <h3>Message</h3>
    <p> hope to see u soon</p>`;
  let transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: mailConfig.user, // generated ethereal user
          pass: mailConfig.pass // generated ethereal password
      },
      tls: {
          rejectUnauthorized: false
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <test@tahirraza.com>', // sender address
      to: 'tahiranjamraza@gmail.com', // list of receivers
      subject: 'Nodemailer Contact', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) res.send(error);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.send('Your mail has been sent');
  });
}
