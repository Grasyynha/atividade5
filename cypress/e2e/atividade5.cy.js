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
describe('Formato email inválido', () => {
    it('Deve mostrar erro para e-mails em formato inválido', () => {
          cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');
          cy.get('input[name="email"]')
          .type('invalid-email');
    
       
          cy.get('button[type="submit"]').click();
    
       
          cy.get('.sc-cPiKLX.feFrSQ') 
          .should('be.visible')
          .and('contain.text', 'Formato de e-mail inválido'); 
      });
    });

describe('Email Duplicado', () => {
      const emailDuplicado = 'duplicado@teste.com';
     it('Deve bloquear cadastro com e-mail já utilizado', () => {
         cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');
  
         cy.get('input[name="email"]').clear().type(emailDuplicado);
  
     
         cy.get('button[type="submit"]').click();
   
       
        cy.get('.sc-dCFHLb.lmTxRO')
    
         .should('be.visible') 
         .and('contain.text', 'Este e-mail já é utilizado por outro usuário'); 
     });
   });
describe("Listar usuários", () => {
    beforeEach(() => {
      cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
    });

    it("Listar todos usuários cadastrados", () => {
      cy.intercept("GET", "", {

        statusCode: 200,

        body: [
          {
           id: "a41b4eaf-8e03-47ba-a520-738503d35320",
           name: "jony",
           email: "jl@gmail.com",
           updatedAt: "2024-04-30T03:07:09.722Z",
           createdAt: "2024-04-30T03:07:09.722Z"
          },
          {
           id: "1b905b6f-bf6f-4147-8a84-1bed9a5bef03",
           name: "luca",
           email: "lu@gmail.com",
           updatedAt: "2024-04-30T03:09:15.762Z",
           createdAt: "2024-04-30T03:09:15.762Z",
          },
        ],
      });
  
       cy.get("#listaUsuarios").should("be.visible");
      });
  
    })
    it("Sem usuários cadastrados - Deverá exibir opção para cadastrar um usuário", () => {
      cy.intercept("GET", "", {
      statusCode: 200,
      body: [],
    }).as("emptyList");

     cy.wait("@emptyList");
  
     cy.get("h3")
     .contains(" Não existe nenhum usuário para ser exibido.")
     .should("be.visible");
     cy.get("p").contains("Cadastre um novo usuário").should("be.visible");
   });
})
describe("Pesquisar usuários", () => {
  beforeEach(() => {
    cy.visit("https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/search");
  });
   it("Pesquisar usuário com sucesso", () => {
     cy.intercept(
     "GET",
     "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/search?value=name",
     {
      statusCode: 200,
      body: [
        {
          
         id: "064a3516-cec2-4f8c-b426-9eef5f9fb2b5",
         name: "lili",
         email: "lili@gmail.com",
         createdAt: "2024-04-30T00:06:36.017Z",
         updatedAt: "2024-04-30T00:06:36.017Z",
        },
        {
         id: "7006a043-1692-4291-a54e-b57247891334",
         name: "clsZJtFFhwMWhmzMWVAZbmhXOVUPexcugNKcIkTaaolxHWSZGnTVGTZAvCwukdTwNAbJeuzDSMgmpQtpXydxoIhWTRTsEeBDvoCD",
         email: "arthur_santos68@gmail.com",
         createdAt: "2024-04-30T02:01:07.291Z",
         updatedAt: "2024-04-30T02:01:07.291Z"
        },
      ],
    }
  ).as("userEx");
      cy.get(".sc-dcJsrY.hcYPTs");

      cy.get("#listaUsuarios").should("be.visible");
});

})
