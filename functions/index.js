const functions = require('firebase-functions')
const cors = require('cors')
const app = require('express')()
const {
  login,
  addAluno,
  listaDeAlunos,
  aluno,
  editarAluno,
  getDadosDesempenho,
  postDadosDesempenho,
  deleteAluno,
  blockAluno,
  cronjob
} = require('./handlers/users')
const FBAuth = require('./util/fbAuth')

app.use(cors({ origin: true }))

app.post('/', login)
app.post('/addAluno', FBAuth, addAluno)
app.get('/listaDeAlunos', FBAuth, listaDeAlunos)
app.post('/aluno', FBAuth, aluno)
app.post('/editarAluno', FBAuth, editarAluno)
app.post('/getDadosDesempenho', FBAuth, getDadosDesempenho)
app.post('/postDadosDesempenho', FBAuth, postDadosDesempenho)
app.post('/deleteAluno', FBAuth, deleteAluno)
app.post('/blockAluno', FBAuth, blockAluno)
app.get('/cronjob', cronjob)

exports.api = functions.https.onRequest(app)
