import { faker } from '@faker-js/faker';

    const name = faker.person.fullName(); 
    const email = faker.internet.email();

describe('Consulta de Usuários', () => {
   beforeEach(function () {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
    cy.contains('Novo').click();
   })


describe('Cadastro de Usuários', function() {

    it('Deve permitir o cadastro do usuario', function () {
          cy.get('#name').type(name); 
          cy.get('#email').type(email); 
          cy.get('.sc-dAlyuH').click(); 
        });
    });


describe('Formato email inválido', () => {
    it('Deve mostrar erro para e-mails em formato inválido', () => {
          cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');
          cy.get('input[name="name"]').type(name);
          cy.get('input[name="email"]').type('meu email.com');
          cy.get('button[type="submit"]').click();       
          cy.get('.sc-cPiKLX.feFrSQ').should('be.visible').and('contain.text', 'Formato de e-mail inválido'); 
      });
    });


describe('Email Duplicado', () => {
    it('Deve bloquear cadastro com e-mail já utilizado', () => {
          cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');
          cy.get('input[name="name"]').type('Darla Turner');
          cy.get('input[name="email"]').type('Reed53@hotmail.com');
          cy.get('button[type="submit"]').click();
          cy.get('.sc-dCFHLb.lmTxRO').should('be.visible').and('contain.text', 'Este e-mail já é utilizado por outro usuário'); 
      });
  });


  /*
  PESQUISAR UM USUARIO
1. Um texto deve ser informado para que a pesquisa seja realizada. 
2. Devem ser apresentados para o cliente todas as informações dos usuários que possuem em seu nome ou email o conteúdo pesquisado
*/
  describe('Pesquisar um usuario', () => {
    it('. Devem ser apresentados todas as informações dos usuários pesquisado', () => {
          cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
          cy.get('.sc-gsFSXq.mUpIH').type("Grasiela Texeira")
          cy.get('.sc-hzhJZQ.cShbuI').click()
          cy.get('input[name="id"]').should('have.value', 'b858e247-8cf3-4798-806e-602e866d7cdc')
          cy.get('input[name="name"]').should('have.value', 'Grasiela Texeira')
          cy.get('input[name="email"]').should('have.value', 'grasy.mst@gmail.com')
          
      });
  });

})

describe('Encontrar um usuario', () => {
    const id = 'b858e247-8cf3-4798-806e-602e866d7cdc'
    it('O usuário deve ser localizado através de seu identificador único', () => {
        cy.request({
            method: 'GET',
            url: `https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users/${id}`,
            body: {
                "id": `${id}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            const listedUser = response.body;
            console.log(response.body)
            expect(listedUser.id).to.eq('b858e247-8cf3-4798-806e-602e866d7cdc')
            expect(listedUser.name).to.eq('Grasiela Texeira')

        })
    })
  })


  describe('Remover um usuario', () => {
    const id = '6746b0cb-184b-48f4-9fb5-171e6aa6db7c'
    it('O usuário a ser removido deve ser localizado através de seu identificador único', () => {
        cy.request({
            method: 'DELETE',
            url: `https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users/${id}`,
            body: {
                "id": `${id}`
            }
        }).then((response) => {
            expect(response.status).to.eq(204)
            console.log(response.status)  
        })
    })
  })
