const { admin, db } = require('../util/admin')
const firebase = require('firebase')
const config = require('../util/config')
const {
	validateLoginData,
	validateSignupData,
	validateDadosDesempenho,
	normalizeBoolean,
	reduceUserDetails
} = require('../util/validators')

firebase.initializeApp(config)

let date = new Date()
let monthNumber = date.getUTCMonth()
let year = date.getFullYear()
let semestre1 = [0, 1, 2, 3, 4, 5]
let semestre = semestre1.includes(monthNumber) ? 1 : 2

exports.login = (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password
	}

	const { valid, errors } = validateLoginData(user)

	if (!valid) return res.status(400).json(errors)

	if (user.email !== 'admin@gmail.com' && user.password !== '123456')
		return res.status(403).json({ general: 'Email ou senha inválidos' })

	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then(data => {
			return data.user.getIdToken()
		})
		.then(token => {
			return res.json({ token })
		})
		.catch(err => {
			console.error(err)
			return res.status(403).json({ general: 'Email ou senha inválidos' })
		})
	return 0
}

exports.addAluno = (req, res) => {
	const newUser = {
		nome: req.body.nome,
		matricula: req.body.matricula,
		sexo: req.body.sexo,
		cpf: req.body.cpf,
		nascimento: req.body.nascimento,
		email: req.body.email,
		telefone: req.body.telefone,
		pais: req.body.pais
	}

	const { valid, errors } = validateSignupData(newUser)

	if (!valid) return res.status(400).json(errors)

	admin
		.auth()
		.createUser({
			email: newUser.email,
			password: newUser.cpf,
			emailVerified: false,
			disabled: false
		})
		.then(userRecord => {
			const userCredentials = {
				userId: userRecord.uid,
				desativado: false,
				nome: newUser.nome,
				matricula: newUser.matricula,
				sexo: normalizeBoolean(newUser.sexo),
				cpf: newUser.cpf,
				nascimento: newUser.nascimento,
				email: newUser.email,
				telefone: newUser.telefone,
				pais: newUser.pais,
				foto:
					'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',
				DATA: new Date(),
				PA: 0,
				FC: 0,
				altura: 0,
				Pesos: {
					[year]: {
						[semestre]: {
							[monthNumber]: 0
						}
					}
				},
				peso: 0,
				pesoMeta: 0,
				pesoInicial: 0,
				IMCs: {
					[year]: {
						[semestre]: {
							[monthNumber]: 0
						}
					}
				},
				imc: 0,
				imcMeta: 0,
				imcInicial: 0,
				BFs: {
					[year]: {
						[semestre]: {
							[monthNumber]: 0
						}
					}
				},
				bf: 0,
				bfMeta: 0,
				bfInicial: 0,
				PCCQs: {
					[year]: {
						[semestre]: {
							[monthNumber]: parseFloat(0)
						}
					}
				},
				pccq: 0,
				pccqMeta: 0,
				pccqInicial: 0,
				ITMs: {
					[year]: {
						[semestre]: {
							[monthNumber]: 0
						}
					}
				},
				itm: 0,
				itmMeta: 0,
				itmInicial: 0,
				Musculares: {
					[year]: {
						[semestre]: {
							[monthNumber]: 0
						}
					}
				},
				muscular: 0,
				muscularMeta: 0,
				muscularInicial: 0,
				Vo2s: {
					[year]: {
						[semestre]: {
							[monthNumber]: 0
						}
					}
				},
				vo2: 0,
				vo2Meta: 0,
				vo2Inicial: 0,
				Flexibilidades: {
					[year]: {
						[semestre]: {
							[monthNumber]: 0
						}
					}
				},
				flex: 0,
				flexMeta: 0,
				flexInicial: 0,
				Agachamentos: {
					[year]: {
						[semestre]: {
							[monthNumber]: 0
						}
					}
				},
				agachamento: 0,
				agachamentoMeta: 0,
				agachamentoInicial: 0,
				Abdomens: {
					[year]: {
						[semestre]: {
							[monthNumber]: 0
						}
					}
				},
				abdomen: 0,
				abdomenMeta: 0,
				abdomenInicial: 0,
				Apoios: {
					[year]: {
						[semestre]: {
							[monthNumber]: 0
						}
					}
				},
				apoio: 0,
				apoioMeta: 0,
				apoioInicial: 0,
				taxaMetabolica: 0,
				idadeBio: 0,
				gorduraVisceral: 0,
				cintura: 0,
				quadril: 0,
				bracoRelax: 0,
				bracoTenso: 0
			}
			return db.doc(`/usuarios/${userCredentials.userId}`).set(userCredentials)
		})
		.then(() => {
			return res.status(201).json({ general: 'Aluno cadastrado com sucesso' })
		})
		.catch(err => {
			console.error(err)
			if (err.code === 'auth/email-already-exists') {
				return res.status(400).json({ email: 'Email já cadastrado' })
			} else if (err.code === 'auth/invalid-password') {
				return res.status(400).json({ cpf: 'CPF inválido' })
			} else {
				return res.status(500).json({ general: 'Algo deu errado, por favor, tente novamente' })
			}
		})
	return 0
}

exports.listaDeAlunos = (req, res) => {
	let users = []
	db.collection('usuarios')
		.orderBy('nome')
		.get()
		.then(snapShot => {
			snapShot.docs.forEach(doc => {
				users.push({
					nome: doc.data().nome,
					matricula: doc.data().matricula,
					cpf: doc.data().cpf,
					sexo: doc.data().sexo,
					email: doc.data().email,
					id: doc.data().userId,
					desativado: doc.data().desativado
				})
			})
			return res.status(200).json(users)
		})
		.catch(err => {
			console.error(err)
			res.status(500).json({ error: err.code })
		})
}

exports.aluno = (req, res) => {
	let aluno = {}
	db.doc(`/usuarios/${req.body.id}`)
		.get()
		.then(doc => {
			aluno.nome = doc.data().nome
			aluno.matricula = doc.data().matricula
			aluno.cpf = doc.data().cpf
			aluno.sexo = doc.data().sexo
			aluno.id = doc.data().userId
			aluno.idade = doc.data().nascimento
			aluno.telefone = doc.data().telefone
			aluno.email = doc.data().email
			aluno.pais = doc.data().pais
			aluno.nascimento = doc.data().nascimento
			return res.status(200).json(aluno)
		})
		.catch(err => {
			console.error(err)
			return res.status(500).json({ error: err.code })
		})
}

exports.editarAluno = (req, res) => {
	let aluno = req.body

	const { valid, errors } = validateSignupData(aluno)

	if (!valid) return res.status(400).json(errors)

	aluno = reduceUserDetails(aluno)

	db.doc(`/usuarios/${req.body.id}`)
		.update(aluno)
		.then(() => res.json({ message: 'Aluno atualizado com sucesso' }))
		.catch(err => {
			console.error(err)
			return res.status(500).json({ error: err.code })
		})
	return 0
}

exports.getDadosDesempenho = (req, res) => {
	let aluno = {}
	db.doc(`/usuarios/${req.body.id}`)
		.get()
		.then(doc => {
			aluno.PA = doc.data().PA
			aluno.FC = doc.data().FC
			aluno.altura = doc.data().altura
			aluno.peso = doc.data().peso
			aluno.imc = doc.data().imc
			aluno.bf = doc.data().bf
			aluno.muscular = doc.data().muscular
			aluno.taxaMetabolica = doc.data().taxaMetabolica
			aluno.idadeBio = doc.data().idadeBio
			aluno.gorduraVisceral = doc.data().gorduraVisceral
			aluno.cintura = doc.data().cintura
			aluno.quadril = doc.data().quadril
			aluno.bracoRelax = doc.data().bracoRelax
			aluno.bracoTenso = doc.data().bracoTenso
			aluno.flex = doc.data().flex
			aluno.agachamento = doc.data().agachamento
			aluno.abdomen = doc.data().abdomen
			aluno.apoio = doc.data().apoio
			aluno.vo2 = doc.data().vo2
			aluno.pesoMeta = doc.data().pesoMeta
			aluno.imcMeta = doc.data().imcMeta
			aluno.pccqMeta = doc.data().pccqMeta
			aluno.bfMeta = doc.data().bfMeta
			aluno.muscularMeta = doc.data().muscularMeta
			aluno.itmMeta = doc.data().itmMeta
			aluno.flexMeta = doc.data().flexMeta
			aluno.agachamentoMeta = doc.data().agachamentoMeta
			aluno.abdomenMeta = doc.data().abdomenMeta
			aluno.apoioMeta = doc.data().apoioMeta
			aluno.vo2Meta = doc.data().vo2Meta
			aluno.pesoInicial = doc.data().pesoInicial
			aluno.imcInicial = doc.data().imcInicial
			aluno.bfInicial = doc.data().bfInicial
			aluno.pccqInicial = doc.data().pccqInicial
			aluno.itmInicial = doc.data().itmInicial
			aluno.muscularInicial = doc.data().muscularInicial
			aluno.vo2Inicial = doc.data().vo2Inicial
			aluno.flexInicial = doc.data().flexInicial
			aluno.agachamentoInicial = doc.data().agachamentoInicial
			aluno.apoioInicial = doc.data().apoioInicial
			aluno.abdomenInicial = doc.data().abdomenInicial
			return res.status(200).json(aluno)
		})
		.catch(err => {
			console.error(err)
			return res.status(500).json({ error: err.code })
		})
}

exports.postDadosDesempenho = (req, res) => {
	let aluno = req.body

	const { valid, errors } = validateDadosDesempenho(aluno)

	for (let val in aluno) {
		if (val === 'id') continue
		aluno[val] = Number(aluno[val])
	}

	aluno['Pesos.' + year + '.' + semestre + '.' + monthNumber] = Number(req.body.peso)
	aluno['IMCs.' + year + '.' + semestre + '.' + monthNumber] = Number(req.body.imc)
	aluno['BFs.' + year + '.' + semestre + '.' + monthNumber] = Number(req.body.bf)
	aluno['PCCQs.' + year + '.' + semestre + '.' + monthNumber] = Number(req.body.cintura) / (Number(req.body.quadril) === 0 ? 1 : Number(req.body.quadril))
	aluno['ITMs.' + year + '.' + semestre + '.' + monthNumber] = Number((Number(req.body.bracoTenso) / (Number(req.body.bracoRelax) === 0 ? 1 : Number(req.body.bracoRelax))) * 100)
	aluno['Musculares.' + year + '.' + semestre + '.' + monthNumber] = Number(req.body.muscular)
	aluno['Vo2s.' + year + '.' + semestre + '.' + monthNumber] = Number(req.body.vo2)
	aluno['Flexibilidades.' + year + '.' + semestre + '.' + monthNumber] = Number(req.body.flex)
	aluno['Agachamentos.' + year + '.' + semestre + '.' + monthNumber] = Number(req.body.agachamento)
	aluno['Abdomens.' + year + '.' + semestre + '.' + monthNumber] = Number(req.body.abdomen)
	aluno['Apoios.' + year + '.' + semestre + '.' + monthNumber] = Number(req.body.apoio)
	aluno.pesoInicial = Number(req.body.pesoInicial) || Number(req.body.peso)
	aluno.imcInicial = Number(req.body.imcInicial) || Number(req.body.imc)
	aluno.bfInicial = Number(req.body.bfInicial) || Number(req.body.bf)
	aluno.pccqInicial = Number(req.body.pccqInicial) || Number(req.body.cintura) / (Number(req.body.quadril) === 0 ? 1 : Number(req.body.quadril))
	aluno.itmInicial = Number(req.body.itmInicial) || Number((Number(req.body.bracoTenso) / (Number(req.body.bracoRelax) === 0 ? 1 : Number(req.body.bracoRelax))) * 100)
	aluno.muscularInicial = Number(req.body.muscularInicial) || Number(req.body.muscular)
	aluno.vo2Inicial = Number(req.body.vo2Inicial) || Number(req.body.vo2)
	aluno.flexInicial = Number(req.body.flexInicial) || Number(req.body.flex)
	aluno.agachamentoInicial = Number(req.body.agachamentoInicial) || Number(req.body.agachamento)
	aluno.abdomenInicial = Number(req.body.abdomenInicial) || Number(req.body.abdomen)
	aluno.apoioInicial = Number(req.body.apoioInicial) || Number(req.body.apoio)
	aluno.peso = Number(req.body.peso)
	aluno.imc = Number(req.body.imc)
	aluno.bf = Number(req.body.bf)
	aluno.pccq = Number(req.body.cintura) / (Number(req.body.quadril) === 0 ? 1 : Number(req.body.quadril))
	aluno.itm = Number((Number(req.body.bracoTenso) / (Number(req.body.bracoRelax) === 0 ? 1 : Number(req.body.bracoRelax))) * 100)
	aluno.muscular = Number(req.body.muscular)
	aluno.vo2 = Number(req.body.vo2)
	aluno.flex = Number(req.body.flex)
	aluno.agachamento = Number(req.body.agachamento)
	aluno.abdomen = Number(req.body.abdomen)
	aluno.apoio = Number(req.body.apoio)
	if (!valid) return res.status(400).json(errors)

	db.doc(`/usuarios/${req.body.id}`)
		.update(aluno)
		.then(() => res.json({ message: 'Usuário atualizado com sucesso' }))
		.catch(err => {
			console.error(err)
			return res.status(500).json({ error: err.code })
		})
	return 0
}

exports.deleteAluno = (req, res) => {
	let query = db.collection('usuarios').where('userId', '==', req.body.id)
	query
		.get()
		.then(() => {
			admin.auth().deleteUser(req.body.id)
			return db.doc(`usuarios/${req.body.id}`).delete()
		})
		.then(() => {
			return res.status(200).json({ message: 'Usuario apagado com sucesso' })
		})
		.catch(err => {
			console.error(err)
			return res.status(500).json({ error: err.code })
		})
}

exports.blockAluno = (req, res) => {
	let flip
	admin
		.auth()
		.getUser(req.body.id)
		.then(userRecord => {
			flip = !userRecord.disabled
			return db.doc(`/usuarios/${req.body.id}`).update({ desativado: flip })
		})
		.then(() => {
			return admin.auth().updateUser(req.body.id, {
				disabled: flip
			})
		})
		.then(() => {
			if (!flip) return res.status(200).json({ message: 'Usuario ativado com sucesso' })
			return res.status(200).json({ message: 'Usuario desativado com sucesso' })
		})
		.catch(err => {
			console.error(err)
			return res.status(500).json({ error: err.code })
		})
}

exports.cronjob = (req, res) => {
	if (date.getUTCDate() === 1) {
		db.collection('usuarios')
			.get()
			.then(snapshot => {
				return snapshot.forEach(doc => {
					db.collection('usuarios')
						.doc(doc.id)
						.update({
							['Pesos.' + year + '.' + semestre + '.' + monthNumber]: 0,
							['IMCs.' + year + '.' + semestre + '.' + monthNumber]: 0,
							['BFs.' + year + '.' + semestre + '.' + monthNumber]: 0,
							['PCCQs.' + year + '.' + semestre + '.' + monthNumber]: 0,
							['ITMs.' + year + '.' + semestre + '.' + monthNumber]: 0,
							['Musculares.' + year + '.' + semestre + '.' + monthNumber]: 0,
							['Vo2s.' + year + '.' + semestre + '.' + monthNumber]: 0,
							['Flexibilidades.' + year + '.' + semestre + '.' + monthNumber]: 0,
							['Agachamentos.' + year + '.' + semestre + '.' + monthNumber]: 0,
							['Abdomens.' + year + '.' + semestre + '.' + monthNumber]: 0,
							['Apoios.' + year + '.' + semestre + '.' + monthNumber]: 0
						})
				})
			})
			.then(() => {
				return res.status(200).json({ message: 'Scheduled job executed successfully' })
			})
			.catch(error => console.log(error))
	}
	return res.status(400).json({ message: 'Wrong day' })
}
