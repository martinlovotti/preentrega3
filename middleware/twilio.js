import twilio from 'twilio';

const accountSid = process.env.ACCOUNTSID // Your Account SID from www.twilio.com/console
const authToken = process.env.AUTHTOKEN // Your Auth Token from www.twilio.com/console

const client = twilio(accountSid, authToken);

const sendSMS = async (data) => {

  try {
    const message = await client.messages.create({
      body: 'Su pedid ha sido Realizado y se encuentra en Proceso. Nos pondremos en contacto con usted para confirmar el envio',
      from: process.env.TWILIONUMBER, // Twilio number - en Get a Number en My first Twilio account
      to: data // Text this number
    });
    console.log(message.sid);
  }
  catch (error) {
    console.log(error);
  }

}

export default sendSMS;


