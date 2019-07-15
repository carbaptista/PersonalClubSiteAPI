const isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.match(regEx)) return true
  return false
}

const isCpf = cpf => {
  let soma = 0
  let resto

  if (cpf === '00000000000') return false
  for (let i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  resto = (soma * 10) % 11

  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.substring(9, 10))) return false

  soma = 0
  for (let i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  resto = (soma * 10) % 11

  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.substring(10, 11))) return false
  return true
}

const isEmpty = string => {
  if (typeof string === 'boolean') return false
  if (string.trim() === '') return true
  return false
}

exports.validateLoginData = data => {
  let errors = {}

  if (isEmpty(data.email)) errors.email = '*Campo obrigatório'
  if (isEmpty(data.password)) errors.password = '*Campo obrigatório'

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.validateSignupData = data => {
  let errors = {}

  if (isEmpty(data.email)) {
    errors.email = '*Campo obrigatório'
  } else if (!isEmail(data.email)) {
    errors.email = 'Email inválido'
  }
  if (isEmpty(data.cpf)) {
    errors.cpf = '*Campo obrigatório'
  } else if (!isCpf(data.cpf)) {
    errors.cpf = 'CPF inválido'
  }
  if (isEmpty(data.nome)) errors.nome = '*Campo obrigatório'
  if (isEmpty(data.matricula)) errors.matricula = '*Campo obrigatório'
  if (isEmpty(data.sexo)) errors.sexo = '*Campo obrigatório'
  if (isEmpty(data.nascimento)) errors.nascimento = '*Campo obrigatório'
  if (isEmpty(data.telefone)) errors.telefone = '*Campo obrigatório'
  if (isEmpty(data.pais)) errors.pais = '*Campo obrigatório'

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.validateDadosDesempenho = data => {
  let errors = {}

  if (typeof(data.PA) === 'string' && isEmpty(data.PA)) errors.PA = '*Campo obrigatório'
  if (typeof(data.FC) === 'string' && isEmpty(data.FC)) errors.FC = '*Campo obrigatório'
  if (typeof(data.abdomen) === 'string' && isEmpty(data.abdomen)) errors.abdomen = '*Campo obrigatório'
  if (typeof(data.abdomenMeta) === 'string' && isEmpty(data.abdomenMeta)) errors.abdomenMeta = '*Campo obrigatório'
  if (typeof(data.agachamento) === 'string' && isEmpty(data.agachamento)) errors.agachamento = '*Campo obrigatório'
  if (typeof(data.agachamentoMeta) === 'string' && isEmpty(data.agachamentoMeta)) errors.agachamentoMeta = '*Campo obrigatório'
  if (typeof(data.altura) === 'string' && isEmpty(data.altura)) errors.altura = '*Campo obrigatório'
  if (typeof(data.apoio) === 'string' && isEmpty(data.apoio)) errors.apoio = '*Campo obrigatório'
  if (typeof(data.apoioMeta) === 'string' && isEmpty(data.apoioMeta)) errors.apoioMeta = '*Campo obrigatório'
  if (typeof(data.bf) === 'string' && isEmpty(data.bf)) errors.bf = '*Campo obrigatório'
  if (typeof(data.bfMeta) === 'string' && isEmpty(data.bfMeta)) errors.bfMeta = '*Campo obrigatório'
  if (typeof(data.bracoRelax) === 'string' && isEmpty(data.bracoRelax)) errors.bracoRelax = '*Campo obrigatório'
  if (typeof(data.bracoTenso) === 'string' && isEmpty(data.bracoTenso)) errors.bracoTenso = '*Campo obrigatório'
  if (typeof(data.cintura) === 'string' && isEmpty(data.cintura)) errors.cintura = '*Campo obrigatório'
  if (typeof(data.flex) === 'string' && isEmpty(data.flex)) errors.flex = '*Campo obrigatório'
  if (typeof(data.flexMeta) === 'string' && isEmpty(data.flexMeta)) errors.flexMeta = '*Campo obrigatório'
  if (typeof(data.gorduraVisceral) === 'string' && isEmpty(data.gorduraVisceral)) errors.gorduraVisceral = '*Campo obrigatório'
  if (typeof(data.idadeBio) === 'string' && isEmpty(data.idadeBio)) errors.idadeBio = '*Campo obrigatório'
  if (typeof(data.imc) === 'string' && isEmpty(data.imc)) errors.imc = '*Campo obrigatório'
  if (typeof(data.imcMeta) === 'string' && isEmpty(data.imcMeta)) errors.imcMeta = '*Campo obrigatório'
  if (typeof(data.itmMeta) === 'string' && isEmpty(data.itmMeta)) errors.itmMeta = '*Campo obrigatório'
  if (typeof(data.muscular) === 'string' && isEmpty(data.muscular)) errors.muscular = '*Campo obrigatório'
  if (typeof(data.muscularMeta) === 'string' && isEmpty(data.muscularMeta)) errors.muscularMeta = '*Campo obrigatório'
  if (typeof(data.pccqMeta) === 'string' && isEmpty(data.pccqMeta)) errors.pccqMeta = '*Campo obrigatório'
  if (typeof(data.peso) === 'string' && isEmpty(data.peso)) errors.peso = '*Campo obrigatório'
  if (typeof(data.pesoMeta) === 'string' && isEmpty(data.pesoMeta)) errors.pesoMeta = '*Campo obrigatório'
  if (typeof(data.quadril) === 'string' && isEmpty(data.quadril)) errors.quadril = '*Campo obrigatório'
  if (typeof(data.taxaMetabolica) === 'string' && isEmpty(data.taxaMetabolica)) errors.taxaMetabolica = '*Campo obrigatório'
  if (typeof(data.vo2) === 'string' && isEmpty(data.vo2)) errors.vo2 = '*Campo obrigatório'
  if (typeof(data.vo2Meta) === 'string' && isEmpty(data.vo2Meta)) errors.vo2Meta = '*Campo obrigatório'

  if (isNaN(data.PA)) errors.PA = '*Deve ser número'
  if (isNaN(data.FC)) errors.FC = '*Deve ser número'
  if (isNaN(data.abdomen)) errors.abdomen = '*Deve ser número'
  if (isNaN(data.abdomenMeta)) errors.abdomenMeta = '*Deve ser número'
  if (isNaN(data.agachamento)) errors.agachamento = '*Deve ser número'
  if (isNaN(data.agachamentoMeta)) errors.agachamentoMeta = '*Deve ser número'
  if (isNaN(data.altura)) errors.altura = '*Deve ser número'
  if (isNaN(data.apoio)) errors.apoio = '*Deve ser número'
  if (isNaN(data.apoioMeta)) errors.apoioMeta = '*Deve ser número'
  if (isNaN(data.bf)) errors.bf = '*Deve ser número'
  if (isNaN(data.bfMeta)) errors.bfMeta = '*Deve ser número'
  if (isNaN(data.bracoRelax)) errors.bracoRelax = '*Deve ser número'
  if (isNaN(data.bracoTenso)) errors.bracoTenso = '*Deve ser número'
  if (isNaN(data.cintura)) errors.cintura = '*Deve ser número'
  if (isNaN(data.flex)) errors.flex = '*Deve ser número'
  if (isNaN(data.flexMeta)) errors.flexMeta = '*Deve ser número'
  if (isNaN(data.gorduraVisceral)) errors.gorduraVisceral = '*Deve ser número'
  if (isNaN(data.idadeBio)) errors.idadeBio = '*Deve ser número'
  if (isNaN(data.imc)) errors.imc = '*Deve ser número'
  if (isNaN(data.imcMeta)) errors.imcMeta = '*Deve ser número'
  if (isNaN(data.itmMeta)) errors.itmMeta = '*Deve ser número'
  if (isNaN(data.muscular)) errors.muscular = '*Deve ser número'
  if (isNaN(data.muscularMeta)) errors.muscularMeta = '*Deve ser número'
  if (isNaN(data.pccqMeta)) errors.pccqMeta = '*Deve ser número'
  if (isNaN(data.peso)) errors.peso = '*Deve ser número'
  if (isNaN(data.pesoMeta)) errors.pesoMeta = '*Deve ser número'
  if (isNaN(data.quadril)) errors.quadril = '*Deve ser número'
  if (isNaN(data.taxaMetabolica)) errors.taxaMetabolica = '*Deve ser número'
  if (isNaN(data.vo2)) errors.vo2 = '*Deve ser número'
  if (isNaN(data.vo2Meta)) errors.vo2Meta = '*Deve ser número'

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.normalizeBoolean = value => {
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}

exports.reduceUserDetails = data => {
  let userDetails = {}
  if (!isEmpty(data.nome.trim())) userDetails.nome = data.nome
  if (!isEmpty(data.matricula.trim())) userDetails.matricula = data.matricula
  if (!isEmpty(data.cpf.trim())) userDetails.cpf = data.cpf
  if (!isEmpty(data.nascimento.trim())) userDetails.nascimento = data.nascimento
  if (!isEmpty(data.telefone.trim())) userDetails.telefone = data.telefone
  if (!isEmpty(data.email.trim())) userDetails.email = data.email
  if (!isEmpty(data.pais.trim())) userDetails.pais = data.pais
  if (typeof data.sexo === 'boolean') userDetails.sexo = data.sexo

  return userDetails
}
