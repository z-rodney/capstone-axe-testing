const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { oneDayInSeconds } = require('../../constants');

// Calculate days between two dates to determine time since exposure
const daysBetween = (date1, date2) => {
  return Math.abs(Math.ceil((date1 - date2) / oneDayInSeconds));
}

// Return all contacts that have met within 15 days of the positive result
const getRecentContacts = (resultDate, contacts) => {
  return contacts.filter(contact => {
    let differenceInDays = daysBetween(resultDate, contact.contactDate);
    if (differenceInDays <= 15) return contact;
  });
}

const generateMessage = (date, email) => {
  return {
  to: email,
  from: 'noreply.proximity@gmail.com',
  subject: 'Recent COVID-19 Exposure',
  text: `Someone you contacted on or around ${new Date(date).toDateString()} tested positive for COVID-19 within two weeks of being in contact with you.
  We recommend you get a COVID-19 test as soon as possible.
  The Promixity Team`,
  html: `<h2>Proximity</h2>
  <p>Someone you contacted on or around ${new Date(date).toDateString()} tested positive for COVID-19 within two weeks of being in contact with you.
  We recommend you get a COVID-19 test as soon as possible.</p>
  </br>
  <p>The Proximity Team</p>`,
  }
}

// Create messages for each contact to be notified
const generateBatchMessages = (contacts) => {
  return contacts.map(contact => {
    const { contactDate, username } = contact;
    return generateMessage(contactDate, username);
  });
}

// Use Send Grid to send email to relevant contacts
const alertContacts = async (resultDate, contacts) => {
  try {
    const recentContacts = getRecentContacts(resultDate, contacts);
    if (recentContacts.length) {
      const messages = generateBatchMessages(recentContacts);
      await sgMail.send(messages);
    }
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}

module.exports = alertContacts;

