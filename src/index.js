const express = require('express')
const { v4: uuidv4, validate } = require('uuid')

const app = express()

app.use(express.json())

const projects = []

function logRequest(request, response, next) {
  const { method, url } = request

  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.time(logLabel)

  next()

  console.timeEnd(logLabel)
}

function validateProjectId(request, response, next) {
  const { id } = request.params

  if (!validate(id)) {
    return response.status(400).json({ error: `ID invalido.` })
  }

  return next()
}

app.use(logRequest)
app.use('/projects/:id', validateProjectId)

app.get('/', (request, response) => {
  return response.json({ mensage: 'Hello word' })
})

app.get('/projects', (request, response) => {
  const { nome } = request.query

  const results = nome
    ? projects.filter(project => project.nome.includes(nome))
    : projects
  return response.json(results)
})

app.post('/projects', (request, response) => {
  const {
    nome,
    nomeFantasia,
    tipoPessoa,
    tipoCliente,
    cnpj_Cpf,
    rg,
    InscricaoEstadual,
    telefone,
    endereco,
    bairro,
    cep,
    codMunicipio,
    numero,
    complemento,
    email,
    dataNascimento,
    sexo,
    dataCadastro,
    ativo
  } = request.body

  const project = {
    id: uuidv4(),
    nome,
    nomeFantasia,
    tipoPessoa,
    tipoCliente,
    cnpj_Cpf,
    rg,
    InscricaoEstadual,
    telefone,
    endereco,
    bairro,
    cep,
    codMunicipio,
    numero,
    complemento,
    email,
    dataNascimento,
    sexo,
    dataCadastro,
    ativo
  }

  projects.push(project)

  return response.json(project)
})

app.put('/projects/:id', (request, response) => {
  const { id } = request.params
  const {
    nome,
    nomeFantasia,
    tipoPessoa,
    tipoCliente,
    cnpj_Cpf,
    rg,
    InscricaoEstadual,
    telefone,
    endereco,
    bairro,
    cep,
    codMunicipio,
    numero,
    complemento,
    email,
    dataNascimento,
    sexo,
    dataCadastro,
    ativo
  } = request.body

  const projectIndex = projects.findIndex(project => project.id == id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Registro nao encontrado.' })
  }

  const project = {
    id,
    nome,
    nomeFantasia,
    tipoPessoa,
    tipoCliente,
    cnpj_Cpf,
    rg,
    InscricaoEstadual,
    telefone,
    endereco,
    bairro,
    cep,
    codMunicipio,
    numero,
    complemento,
    email,
    dataNascimento,
    sexo,
    dataCadastro,
    ativo
  }

  projects[projectIndex] = project

  return response.json(project)
})

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params

  const projectIndex = projects.findIndex(project => project.id == id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Registro nao encontrado.' })
  }

  projects.splice(projectIndex, 1)
  return response.status(204).send()
})

app.listen(3333, () => {
  console.log('Back-end Started!🚀')
})
