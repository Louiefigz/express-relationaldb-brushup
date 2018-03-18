import React, { Component } from 'react';
// import logo from './logo.svg';
import './components/user_account/signup.css';
import Book from './components/book'
import {connect} from "react-redux";
import { createBook, getAllBooks } from "./actions/bookActions";
import { signUp } from "./actions/userActions";
import SignUp from "./components/user_account/signUp";

import {bindActionCreators} from "redux";
import { Route, Switch} from 'react-router-dom';



class App extends Component {
    constructor(){
        super();

        this.state = {
            title: '',
            genre:'',
            desc: '',
            name: '',
            username: '',
            email: ''
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


    handleUserSubmit(){
        const data = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email
        }
        this.props.signUp(data);
    }



  render() {
        const allBooks = this.props.getBooks.map( book =>{
            return <Book key={book.id} bookInfo={book} />
        })
      const allUsers = this.props.getUsers.map( user =>{
          return <Book key={user.id} bookInfo={user} />
      })

    return (
      <div className="App">


          <Switch>
              <Route exact path="/signup" name="Signup Page" component={SignUp}/>
          </Switch>
          <input onChange={this.handleInputs.bind(this, 'name' ) } value={this.state.name} placeholder='name'/>
          <input onChange={this.handleInputs.bind(this, 'username' ) } value={this.state.username} placeholder='username'/>
          <input onChange={this.handleInputs.bind(this, 'email' ) } value={this.state.email} placeholder='email'/>
          <button onClick={this.handleUserSubmit.bind(this) } >Submit</button>
          {allUsers}

          <br/><br/>

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
    return {
        getBooks: state.books.getBooks,
        getUsers: state.users.getUsers,
        error: state.users.APIErrorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createBook: createBook,
        getAllBooks: getAllBooks,
        signUp: signUp }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

