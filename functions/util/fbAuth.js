const { admin } = require('./admin')

module.exports = (req, res, next) => {
  let idToken
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else {
    console.error('No token found')
    return res.status(403).json({ error: 'Acesso Negado' })
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      if (decodedToken.uid === 'Iy5YwMQS3QTZhbTkPEe7yu0zT0v1') return next()
			else return res.status(403).json({ error: 'Acesso Negado 2' })
    })
    .catch(err => {
      console.error('Error while verifying token ', err)
      return res.status(403).json({erro: err.code})
    })
    return 0
}
