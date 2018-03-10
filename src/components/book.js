import React, {Component} from 'react';


export default class Book extends Component{


    render(){
        return(
            <div>
                <div>Title: {this.props.bookInfo.title}</div>
                <div>genre: {this.props.bookInfo.genre}</div>
                <div>Desc: {this.props.bookInfo.desc}</div><br/>
            </div>
        )

    }

}