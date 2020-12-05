const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const generateMessage = (date) => {
  return {
  to: 'zainarodney@gmail.com',
  from: 'noreply.proximity@gmail.com', // Use the email address or domain you verified above
  subject: 'Recent COVID-19 Exposure',
  text: `Someone you contacted on ${date} has tested positive for COVID-19.
  We recommend you get a COVID-19 test as soon as possible.`,
    html: `<h2>Proximity</h2>
  <p>Someone you contacted on ${date} has tested positive for COVID-19.
  We recommend you get a COVID-19 test as soon as possible.</p>`,
  }
}

const alertContacts = async (date) => {
  try {
    const msg = generateMessage(date)
    await sgMail.send(msg);
    console.log('email sent')
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

module.exports = alertContacts

