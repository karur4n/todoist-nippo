import * as functions from 'firebase-functions';
import axios from 'axios'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const migratePersonalToken = functions.https.onRequest((_, functionResponse) => {
  axios.post ('https://todoist.com/api/access_tokens/migrate_personal_token')
    .then(function(response) {
      functionResponse.send(response.data)
    })
    .then(function(myJson) {
      console.log(myJson);
    });
})
