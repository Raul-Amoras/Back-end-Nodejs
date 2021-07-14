import { Router } from 'express';
import { v4 as uuid, validate } from 'uuid';

const resgisterRouter = Router();

/*interface projects {
  nome: string,

}
*/


const projects = [] as any;


resgisterRouter.get('/', (request, response) => {
  return response.json(projects)
})

resgisterRouter.post('/register', (request, response) => {
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
    id: uuid(),
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

export default resgisterRouter;
