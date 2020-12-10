const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const daysBetween = (date1, date2) => {
  return Math.abs(Math.ceil((date1 - date2) / 86400000))
}

/* const getContactEmails = (resultDate, contacts) => {
  const emails = []
  contacts.forEach((contact) => {
    let differenceInDays = daysBetween(resultDate, contact.contactDate)
    if (differenceInDays <= 15) {
      emails.push(contact.username)
    }
  })
  return emails
} */

const getRecentContacts = (resultDate, contacts) => {
  return contacts.filter(contact => {
    let differenceInDays = daysBetween(resultDate, contact.contactDate)
    if (differenceInDays <= 15) return contact
  })
}

const generateMessage = (date, email) => {
  return {
  to: email,
  from: 'noreply.proximity@gmail.com',
  subject: 'Recent COVID-19 Exposure',
  text: `Someone you contacted on or around ${new Date(date).toDateString()} tested positive for COVID-19 within two weeks of being in contact with you.
  We recommend you get a COVID-19 test as soon as possible.`,
  html: `<h2>Proximity</h2>
  <p>Someone you contacted on or around ${new Date(date).toDateString()} tested positive for COVID-19 within two weeks of being in contact with you.
  We recommend you get a COVID-19 test as soon as possible.</p>`,
  }
}

const generateBatchMessages = (contacts) => {
  return contacts.map(contact => {
    const { contactDate, username } = contact
    return generateMessage(contactDate, username)
  })
}

const alertContacts = async (resultDate, contacts) => {
  try {
    const recentContacts = getRecentContacts(resultDate, contacts)
    //const emails = getContactEmails(resultDate, contacts)
    if (recentContacts.length) {
      //const msg = generateMessage(resultDate, emails)
      const messages = generateBatchMessages(recentContacts)
      //console.log('msgs:', messages)
      await sgMail.send(messages);
      //console.log('email sent')
    }
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

module.exports = alertContacts

