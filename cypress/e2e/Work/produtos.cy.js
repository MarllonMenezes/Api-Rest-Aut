describe(' Teste da Funcionalidade de Produtos', () => {
    let token;
    before(() => {
        cy.token('007qa@qa.com.br','teste').then(tkn => { token = tkn})

    });

    it('Listar Produtos', () => {
        cy.request({
            method: 'GET',
            url: 'produtos',
        
        }).then((response) => {
            expect(response.status).to.eq(200)
            })
        
    });

    it('Cadastrar Produtos', () => {
        const randomProductName = 'produto teste' + Math.floor(Math.random() * 100000);
        cy.token('007qa@qa.com.br','teste').then(tkn => {
            cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {
            authorization : tkn,
            },
            body: {
            "nome": randomProductName,
            "descricao": "produto para teste",
            "preco": 100,
            "quantidade": 10
            },
            
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        })
    
    });
    });

    it.only('Deve editar um produto já cadastrado', () => {
        cy.request('produtos').then (response => {
            let id = response.body.produtos[1]._id;
            cy.request({
                method: 'PUT',
                url: 'produtos/ ' + id,
                headers: {authorization: token},
                body:{
                "nome": 'produto editado dois barra dois' ,
                "descricao": 'produto editado no put',
                "quantidade": "100",
                "preco": "101"
                }
            })


        })



    });
});