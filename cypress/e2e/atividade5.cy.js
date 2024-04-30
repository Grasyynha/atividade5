import { faker } from '@faker-js/faker';

describe('Consulta de Usuários', () => {
   beforeEach(function () {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');

    cy.contains('Novo').click();

   })
describe('Cadastro de Usuários', function() {
        
          const name = faker.person.fullName(); 
          const email = faker.internet.email();  

    it('Deve permitir o cadastro do usuario', function () {

        
          cy.get('#name').type(name); 
          cy.get('#email').type(email); 
          cy.get('.sc-dAlyuH').click(); 
      
          
        });
    });
})