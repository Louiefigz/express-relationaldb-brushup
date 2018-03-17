import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createBook, updateBook, deleteBook } from '../actions/bookActions';



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

        console.log(this.state)
    }

    handleUpdate(){

        var data = {
            id: this.props.bookInfo.id,
            title: this.state.title ? this.state.title : this.props.bookInfo.title,
            genre: this.state.genre ? this.state.genre : this.props.bookInfo.genre,
            desc: this.state.desc ? this.state.desc : this.props.bookInfo.desc
        }

        this.setState({
            editTriggered: false,
            title:'',
            genre: '',
            desc: ''
        })
        this.props.updateBook(data);

    }

    handleDelete(){
        this.props.deleteBook(this.props.bookInfo.id)
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
                Title: <input placeholder={this.props.bookInfo.title} onChange={this.handleInput.bind(this, 'title')} value={this.state.title}/>
                genre: <input placeholder={this.props.bookInfo.genre} onChange={this.handleInput.bind(this, 'genre')} value={this.state.genre}/>
                Desc: <input placeholder={this.props.bookInfo.desc} onChange={this.handleInput.bind(this, 'desc')} value={this.state.desc}/>

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
    return bindActionCreators({
        createBook: createBook,
        updateBook: updateBook,
        deleteBook: deleteBook}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)