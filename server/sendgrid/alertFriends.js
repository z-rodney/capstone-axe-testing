const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateMessage = (name, date, emails) => {
  return {
  to: emails,
  from: 'noreply.proximity@gmail.com', // Use the email address or domain you verified above
  subject: 'Your Friend Has Tested Positive for COVID-19',
  text: `Your friend, ${name} tested positive for COVID-19 on ${new Date(date).toDateString()}.
  Please check on your friend. We wish them a speedy recovery.`,
  html: `
    <h2>Proximity</h2>
    <p>Your friend, ${name} tested positive for COVID-19 on ${new Date(date).toDateString()}.
    Please check on your friend. We wish them a speedy recovery.</p>
`,
  }
}

const getEmailAddresses = (friends) => {
  return friends.map(friend => friend.username)
}

const alertFriends = async (name, date, friends) => {
  try {
    const emails = getEmailAddresses(friends)
    const msg = generateMessage(name, date, emails)
    //console.log('msg:', msg)
    await sgMail.sendMultiple(msg);
    console.log('email sent')
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

module.exports = alertFriends

