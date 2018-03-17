import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Book from './components/book'
import {connect} from "react-redux";
import { createBook, getAllBooks } from "./actions/bookActions";
import {bindActionCreators} from "redux";


class App extends Component {
    constructor(){
        super();

        this.state = {
            title: '',
            genre:'',
            desc: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        this.props.getAllBooks();
    }


    handleInputs(key, e){
        this.setState({
            [key]: e.target.value
        })
    }

    handleSubmit(){
        const data = {
            title: this.state.title,
            genre: this.state.genre,
            desc: this.state.desc
        }
        this.setState({
            title: '',
            genre: '',
            desc: ''
        })

        this.props.createBook(data);
    }


    handleUpdateDel(e){
        this.setState({
            response: this.state.response.filter(n => n.id !== e.id)
        })
    }



  render() {
        const allBooks = this.props.getBooks.map( book =>{

            console.log('book', book)
            return <Book key={book.id} bookInfo={book} handleUpdateDel={this.handleUpdateDel.bind(this)}/>
        })

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

          <input onChange={this.handleInputs.bind(this, 'title' ) } value={this.state.title} placeholder='title'/>
          <input onChange={this.handleInputs.bind(this, 'genre' ) } value={this.state.genre} placeholder='genre'/>
          <input onChange={this.handleInputs.bind(this, 'desc' ) } value={this.state.desc} placeholder='desc'/>
        <button onClick={this.handleSubmit } >Submit</button>
          {allBooks}
      </div>
    );
  }
}




const mapStateToProps = (state) => {
    return { getBooks: state.books.getBooks }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createBook: createBook,
        getAllBooks: getAllBooks}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

