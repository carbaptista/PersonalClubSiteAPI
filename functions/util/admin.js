const admin = require('firebase-admin')
const serviceAccount = require("../personalclub-52112-firebase-adminsdk-zjwo7-e909fcdf9c.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://personalclub-52112.firebaseio.com",
})

const db = admin.firestore()

module.exports = { admin, db }