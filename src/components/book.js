import React, {Component} from 'react';


export default class Book extends Component{
    constructor(){
        super();
        this.state ={
            editTriggered: false,
            title: '',
            genre: '',
            desc: ''
        }
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleTitle = this.handleInput.bind(this, 'title');
        this.handleGenre = this.handleInput.bind(this, 'genre');


    }

    handleEditButton(){
        this.setState({
            editTriggered: !this.state.editTriggered
        })
    }

    handleInput(cat, event){
        this.setState({
            [cat]: event.target.value
        })
    }



    render(){

        return(
            !this.state.editTriggered ?
            <div>
                <div>Title: {this.props.bookInfo.title} </div>
                <div>genre: {this.props.bookInfo.genre}</div>
                <div>Desc: {this.props.bookInfo.desc}</div>
                <button onClick={this.handleEditButton}> Edit </button><br/><br/>
            </div>
                :
            <div>
                Title: <input placeholder={this.props.bookInfo.title} onChange={this.handleTitle} value={this.state.title}/>
                genre: <input placeholder={this.props.bookInfo.genre} onChange={this.handleGenre} value={this.state.genre}/>
                Desc: <input placeholder={this.props.bookInfo.desc}/>
                <button onClick={this.handleEditButton}> Update </button><br/><br/>
            </div>
        )

    }

}