import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createBook } from '../actions/bookActions';



class Book extends Component{
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
        this.handleDesc = this.handleInput.bind(this, 'desc');
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleEditButton() {
        //if the edit button has been pressed, we are going to send a PUT request
        //then we will wipe this component clean of the updated values completely.

        if (this.state.editTriggered) this.setState({title: '', genre: '', desc: ''})
        this.setState({
            editTriggered: !this.state.editTriggered
        })

    }

    handleInput(cat, event){
        this.setState({
            [cat]: event.target.value
        })
    }

    handleUpdate(){
        var data = {
            title: this.state.title ? this.state.title : this.props.title,
            genre: this.state.genre ? this.state.genre : this.props.genre,
            desc: this.state.desc ? this.state.desc : this.props.desc
        }
        fetch('/books/edit/' + this.props.bookInfo.id, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
            this.setState({title: '', genre: '', desc: '', editTriggered: false})
            res.json()
                .then(resp => { this.props.handleUpdateRes(resp) })
        })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    handleDelete(){
        const data = {
            title: this.state.title ? this.state.title : this.props.title,
            genre: this.state.genre ? this.state.genre : this.props.genre,
            desc: this.state.desc ? this.state.desc : this.props.desc
        }
        fetch('/books/delete/' + this.props.bookInfo.id, {
            method: 'DELETE', // or 'PUT'
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
            this.props.handleUpdateDel(this.props.bookInfo)
        })
            .catch(error => console.error('Error:', error))
    }


    render(){
        return(
            !this.state.editTriggered ?
            <div>
                <div>Title: {this.props.bookInfo.title} </div>
                <div>genre: {this.props.bookInfo.genre}</div>
                <div>Desc: {this.props.bookInfo.desc}</div>
                <button onClick={this.handleEditButton}> Edit </button>
                <button onClick={this.handleDelete}> Delete </button><br/><br/>
            </div>
                :
            <div>
                Title: <input placeholder={this.props.bookInfo.title} onChange={this.handleTitle} value={this.state.title}/>
                genre: <input placeholder={this.props.bookInfo.genre} onChange={this.handleGenre} value={this.state.genre}/>
                Desc: <input placeholder={this.props.bookInfo.desc} onChange={this.handleDesc} value={this.state.desc}/>

                <button onClick={this.handleUpdate}> Update </button>
                <button onClick={this.handleEditButton}> Done</button>
                <br/><br/>
            </div>
        )

    }

}



const mapStateToProps = (state) => {
    return { books: state.books }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({createBook: createBook}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)