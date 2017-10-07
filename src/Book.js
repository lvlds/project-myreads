import React from 'react'

import * as Constants from './Constants'

class Book extends React.Component {

    constructor(props){
      super(props)
      this.onShelfChange = this.onShelfChange.bind(this)
    }

    onShelfChange(e) {
      this.props.updateBook(this.props.book, e.target.value)
    }

    render() {
      const style = {
        width: 128,
        height: 193,
        backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")` 
      }
      return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={style}></div>
            <div className="book-shelf-changer">
              <select onChange={this.onShelfChange}
                      value={ this.props.book.shelf || Constants.None }>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          {this.props.book.authors.map((author, index) => (<div key={index} className="book-authors">{author}</div>))}
        </div>
      )
    }
}

export default Book;