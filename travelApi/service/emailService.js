export const client = require("twilio")(
  "AC5653502143301170ab8f4384ea5afb10",
  "d7bc62df58b3019d5a6f4d69ad7d41e9"
);

// client.messages
//     .create({
//         body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//         from: '+1 517 901 1229',
//         to: '+977 981 1973759'
//     })
//     .then(message => console.log(message.sid));
