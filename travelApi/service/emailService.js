// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = "AC5653502143301170ab8f4384ea5afb10";
const authToken = "41e71457bb85f437dc2eb302a7098707";
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: '+1 517 901 1229',
        to: '+977 981 1973759'
    })
    .then(message => console.log(message.sid));
