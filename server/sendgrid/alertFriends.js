const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const generateMessage = (name, date) => {
  return {
  to: 'zainarodney@gmail.com',
  from: 'noreply.proximity@gmail.com', // Use the email address or domain you verified above
  subject: 'Your Friend Has Tested Positive for COVID-19',
  text: `Your friend, ${name} tested positive for COVID-19 on ${date}.
  Please check on your friend. We wish them a speedy recovery.`,
    html: `
    <head>
      <style>
        #heading, #main {
          font-family: 'Courier New', monospace
        }
        #heading {
          width: 100%;
          height: 30%;
          background: #99D6C4;
        }
        #main {
          height: 70%;
          width: 100%;
          background: #F0F9F7;
        }
      </style>
    </head>
    <body>
      <div id="heading">
        <h2>Proximity</h2>
      </div>
      <div id="main">
        <p>Your friend, ${name} tested positive for COVID-19 on ${date}.
        Please check on your friend. We wish them a speedy recovery.</p>
      </div>
    </body>
  `,
  }
}

const alertFriends = async (name, date) => {
  try {
    const msg = generateMessage(name, date)
    await sgMail.send(msg);
    console.log('email sent')
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

module.exports = alertFriends

