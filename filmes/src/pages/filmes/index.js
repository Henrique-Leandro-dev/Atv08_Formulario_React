import React, { Component } from 'react';
import Menu from '../../components/menu';
import Jumbotron from '../../components/jumbotron'

class Filmes extends Component {
   
    constructor(){
        super();
        this.state = {
            url : 'https://5f8bb64a84531500167068c4.mockapi.io/api/filme',
            filmes : [],
            id : "",
            nome : "",
            categoria : "",
            anoLancamento : ""

        }
        
    }
    

    componentDidMount(){
        this.listar();
        
    }

    listar(){
        fetch(this.state.url ,{
            method : 'GET'
        })

        .then(response => response.json())
        .then(dados => {
            this.setState({filmes : dados,
                id : '',
                nome : '',
                categoria : '',
                anoLancamento : ''
            });
            

            console.log('filmes state' +     this.state.filmes)})
        .catch(err => console.error(err));
    }

    remover(event){
        event.preventDefault();

        console.log(event.target.value);

        fetch(this.state.url + '/' + event.target.value, {
            method : 'DELETE'
        })
        .then(response => response.json())
        .then(dados => {
            alert('Filme removido');

            this.listar();
        })
        .catch(err => console.error(err));

    }

    editar(event){
        event.preventDefault();

        console.log(event.target.value);

        fetch(this.state.url + '/' + event.target.value)
                    .then(response => response.json())
                    .then(dado => {
                        this.setState({id : dado.id});
                        this.setState({nome : dado.nome});
                        this.setState({categoria : dado.categoria});
                        this.setState({anoLancamento : dado.anoLancamento});
                    })
                    .catch(err => console.error(err));
    }

    setNome(event){
        event.preventDefault();

        this.setState({nome : event.target.value});

        console.log(event.target.value);
    }

    limparCampos(event){
        this.setState({
              id : '',
              nome : '',
              categoria : '',
              anoLancamento : ''
          })
      }

    salvar(event){
        event.preventDefault();

        const filme = {
            nome : this.state.nome,
            categoria : this.state.categoria,
            anoLancamento :this.state.anoLancamento,
        }

        let filmeId = this.state.id;
        //if ternário
        // testa a condição, se valida ? , se não :
        let method = (filmeId === "" ? 'POST' : 'PUT');
        let urlRequest = (filmeId === "" ?  this.state.url : this.state.url + '/' + filmeId);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(filme),
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(dado => {
            alert('filme cadastrado');

            this.listar();
        })
        .catch(err => console.error(err));

    }

    
   
    render(){
        return(
            <div>
                < Menu/>
                
                <Jumbotron titulo='Filmes' descricao='Gerencie os seus filmes' />

                <div className="container">
        <div className="bd-example" >
        <form id="formFilme" onSubmit={this.salvar.bind(this)}>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input type="text" className="form-control" id="nome" value={this.state.nome} onChange={this.setNome.bind(this)} aria-describedby="nome" placeholder="Informe o Nome"/>
            </div>
            <div className="form-group">
              <label htmlFor="categoria">Categoria</label>
              <input type="text" className="form-control" id="categoria" value={this.state.categoria} onChange={event => this.setState({categoria : event.target.value})} placeholder="Informe a Categoria"/>
            </div>
            <div className="form-group">
                <label htmlFor="ano">Ano de Lançamento</label>
                <input type="text" className="form-control small" id="anoLancamento" value={this.state.anoLancamento} onChange={event => this.setState({anoLancamento : event.target.value})} placeholder="Informe o Ano de Lançamento"/>
              </div>
              <button type="button" onClick={this.limparCampos.bind(this)} className="btn btn-secondary">Cancelar</button>
            <button type="submit"  className="btn btn-success">Salvar</button>
        </form>

        <table className="table" style={{margintop : '40px'}}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Categoria</th>
                <th scope="col">Ano Lançamento</th>
                <th scope="col">Ações</th>
                <th scope="col"><button type="reset" className="btn btn-primary" onClick={this.limparCampos.bind(this)}>Novo Filme</button></th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
                {
                    this.state.filmes.map(item => {
                        return(
                         <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.categoria}</td>
                            <td>{item.anoLancamento}</td>
                            <td>
                                <button type="button" className="btn btn-danger" value={item.id} onClick={this.remover.bind(this)}>Remover</button>
                                <button type="button" className="btn btn-warning"value={item.id} onClick={this.editar.bind(this)}>Editar</button>
                            </td>
                         </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
    </div>
            </div>
        )
    }

}

export default Filmes;