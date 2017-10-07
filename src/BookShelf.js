import React from 'react'

import BooksGrid from './BooksGrid'

class BookShelf extends React.Component {
    render(){
        return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <BooksGrid books={this.props.books}
                       updateBook={this.props.updateBook} />
          </div>
        </div>
      )
    }
}

export default BookShelf;