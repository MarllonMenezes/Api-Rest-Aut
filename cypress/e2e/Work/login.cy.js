describe('Login - API REST', () => {
  
   
    it('Deve fazer login com sucesso', () => {
      cy.request({
        method: 'POST',
        url: 'login',
        body :{
          "email": "007qa@qa.com.br",
          "password": "teste",
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Login realizado com sucesso');
        cy.log(response.body.authorization);
      });
    });
  });
  