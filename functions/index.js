const axios = require('axios')
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.migratePersonalToken = functions.https.onRequest((request, response) => {
  const url = "https://todoist.com/api/access_tokens/migrate_personal_token"

  return axios.post(url, {
    client_id: functions.config().todoist.client_id,
    client_secret: functions.config().todoist.client_secret,
    personal_token: request.body.personalToken,
    scope: 'data:read'
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((axiosResponse) => {
    response.send(axiosResponse.data)
  }).catch((error) => {
    response.status(400).send(error.message)
  })
})
