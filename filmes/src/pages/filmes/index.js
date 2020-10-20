import React, { Component } from 'react';
import Menu from '../../components/menu';
import Jumbotron from '../../components/jumbotron'

class Filmes extends Component {
    render(){
        return(
            <div>
                < Menu/>
                
                <Jumbotron titulo='Filmes' descricao='Gerencie os seus filmes' />
            </div>
        )
    }

}

export default Filmes;