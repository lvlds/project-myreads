import React from 'react'

import Book from './Book'

class BooksGrid extends React.Component {
  render(){
    return (
      <ol className="books-grid">
        {
          this.props.books.map((book, index) => {
            return (
              <li key={index} >
                <Book book={book}
                      updateBook={this.props.updateBook} />
              </li>)
          })
        }
      </ol>
    )
  }
}

export default BooksGrid;