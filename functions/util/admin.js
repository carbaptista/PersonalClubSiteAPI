const admin = require('firebase-admin')
const serviceAccount = require('')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: ''
})

const db = admin.firestore()

module.exports = { admin, db }
