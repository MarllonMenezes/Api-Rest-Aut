import contracts from '../../contracts/produtos.contracts'

describe(' Teste da Funcionalidade de Produtos', () => {
    let token;
    before(() => {
        cy.token('007qa@qa.com.br','teste').then(tkn => { token = tkn})

    });

    it('Deve validar contrato de produto', () => {
        
        cy.request('produtos').then(response => {
            return contracts.validateAsync(response.body)
        })


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
            "descricao": "produtos para testes",
            "preco": 1110,
            "quantidade": 10
            },
            
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        })
    
        });
    });

    it('Deve editar um produto já cadastrado', () => {
        const randomProductName = 'produto teste' + Math.floor(Math.random() * 100000);
        cy.request('produtos').then (response => {
            let id = response.body.produtos[0]._id;
            cy.request({
                method: 'PUT',
                url: 'produtos/ ' +id,
                headers: {authorization: token},
                body:{
                "nome": randomProductName ,
                "descricao": 'produto editado no put',
                "quantidade": "100",
                "preco": "101"
                }
            })


        })



    });
    
    it('Deve editar um produto cadastrado previamente', () => {
        const randomProductName = 'produto teste' + Math.floor(Math.random() * 100000);
        cy.CadastrarProdutos(token, randomProductName, 'produto para teste', 1001, 10).then(response => {
            let id = response.body._id;
            cy.request({
                method: 'PUT',
                url: 'produtos/' + id,
                headers: {authorization: token},
                body:{
                "nome": randomProductName ,
                "descricao": 'produto put',
                "quantidade": "100",
                "preco": "101"
                }
            }).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Registro alterado com sucesso')
            }) 

        })
    })
    it('Deve deletar um produto cadastrado previamente', () => {
        const randomProductName = 'produto teste' + Math.floor(Math.random() * 100000);
        cy.CadastrarProdutos(token, randomProductName, 'produto para teste', 1001, 10).then(response => {
            let id = response.body._id;
            cy.request({
                method: 'DELETE',
                url: 'produtos/' + id,
                headers: {authorization: token},
            }).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Registro excluído com sucesso')
            }) 

        })


    });
});