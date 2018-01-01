// const {twilioConfig} = require('../config');
const twilio     = require('twilio')//(twilioConfig.ACCOUNT_SID,twilioConfig.AUTH_TOKEN);

module.exports = (req,res,next) => {
  twilio.messages.create({
    to: req.query.phone,
    from: '+441143032790',
    body: req.session.traits
  }, (err,msg)=> {
    if(err) res.send(err);
    // console.log(msg);
    res.json({
      to: msg.to,
      from: msg.from,
      body: msg.body,
      text:'Message Sent Successfull'
    });
  });
}