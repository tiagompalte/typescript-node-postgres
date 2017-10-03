import { testDouble, expect } from './config/helpers';
import User from '../../server/modules/User/service';
const model = require('../../server/models');

describe('Testes Unitários do Controller', () => {

    let email;
    let _id;
  
    const defaultUser = {
      id: 1,
      name: 'Default User',
      email: 'defaultuser@email.com',
      password: '1234'
    }
  
    beforeEach((done) => {
      model.User.destroy({
        where: {}
      })
      .then(() => {
        model.User.create(defaultUser).then(() => {
          console.log(`Default User created`)
          done();
        });
      })
    });

    describe('Método Create', () => {
        it('Deve criar um novo Usuário', () => {
            const novoUsuario = {
                id: 2,
                name: 'Novo usuario',
                email: 'novousuario@email.com',
                password: '1234'
            };
            const user = new User();
            return user.create(novoUsuario)
                .then(data => {
                    expect(data.dataValues).to.have.all.keys(
                        ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']
                    )
                });

        });
    });

    describe('Método Update', () => {
        it('Deve atualizar um Usuário', () => {
            const usuarioAtualizado = {
                name: 'Nome Atualizado',
                email: 'atualizado@email.com'
            };
            const user = new User();
            return user.update(1, usuarioAtualizado).then(data => {
                expect(data[0]).to.be.equal(1);
            })
        });
    });

    describe('Método GET Users', () => {
        it('Deve retornar uma lista com todos os Usuários', () => {
            const user = new User();
            return user.getAll().then(data => {
                expect(data).to.be.an('array');
                expect(data[0]).to.have.all.keys(
                    ['email', 'id', 'name', 'password']
                )
            })
        });
    });

    describe('Método getById', () => {
        it('Retornar um usuário de acordo com o ID passado', () => {
            const user = new User();
            return user.getById(defaultUser.id).then(data => {
                expect(data).to.have.all.keys(
                  ['email', 'id', 'name', 'password']
                )
            })
        })
    });
    
    describe('Método getByEmail', () => {
        it('Retornar um usuário de acordo com o EMAIL passado', () => {
            const user = new User();
            return user.getByEmail(defaultUser.email).then(data => {
              expect(data).to.have.all.keys(
                ['email', 'id', 'name', 'password']
              )
            })
        })
    });

    describe('Método DELETE User', () => {
        it('Deve deletar um Usuários', () => {
            const user = new User();
            return user.delete(1).then(data => {
                expect(data).to.be.equal(1);
            })
        });
    });
    
});