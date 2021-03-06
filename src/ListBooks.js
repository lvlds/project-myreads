import React from 'react'
import { Link  } from 'react-router-dom'

import BookShelf from './BookShelf'

class ListBooks extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title={"Currently Reading"}
                      books={this.props.currentlyReading}
                      updateBook={this.props.updateBook} />
            <BookShelf title={"Want to Read"}
                      books={this.props.wantToRead}
                      updateBook={this.props.updateBook} />
            <BookShelf title={"Read"}
                      books={this.props.read}
                      updateBook={this.props.updateBook} />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks