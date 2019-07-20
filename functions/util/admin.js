const admin = require('firebase-admin')
const serviceAccount = require('../personalclub-23861-firebase-adminsdk-efe42-6141679e08.json')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://personalclub-23861.firebaseio.com'
})

const db = admin.firestore()

module.exports = { admin, db }
