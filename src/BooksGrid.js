import React from 'react'
import Book from './Book'

const BooksGrid = props => {
  return (
    <ol className="books-grid">
      {
        props.books.map((book, index) => {
          return (
            <li key={index} >
              <Book book={book}
                    updateBook={props.updateBook} />
            </li>)
        })
      }
    </ol>
  )
}

export default BooksGrid