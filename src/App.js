import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Book from './components/book'

class App extends Component {
    constructor(){
        super();

        this.state = {
            response: [],
            title: '',
            genre:'',
            desc: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    componentDidMount() {
        this.callApi()
            .then(res =>{
                this.setState({
                    response: res
                })
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/books');
        const body = await response.json();
        console.log(body)
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    handleTitle(e){
        console.log(e.target.value)
        this.setState({
            title: e.target.value
        })
    }

    handleGenre(e){
        this.setState({
            genre: e.target.value
        })
    }

    handleDesc(e){
        console.log('is this getting hit?')
        this.setState({
            desc: e.target.value
        })
    }

    handleSubmit(){
        var data = {
            title: this.state.title,
            genre: this.state.genre,
            desc: this.state.desc
        }
        fetch('/books/new', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
            res.json()
                .then(resp => this.setState({response: this.state.response.concat(resp[0])}))
        })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    componentDidUpdate(){
        console.log('the state changed to : ', this.state.response)
    }

  render() {
        const allBooks = this.state.response.map( book =>{
            return <Book key={book.id} bookInfo={book} />
        })


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
            {allBooks}
          <input onChange={this.handleTitle.bind(this) } placeholder='title'/>
          <input onChange={this.handleGenre.bind(this) } placeholder='genre'/>
          <input onChange={this.handleDesc.bind(this) } placeholder='desc'/>
        <button onClick={this.handleSubmit } >Submit</button>
      </div>
    );
  }
}

export default App;
