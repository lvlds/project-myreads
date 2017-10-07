import React from 'react'

import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

class SearchBooks extends React.Component {

  constructor(props) {
    super(props)
    this.onSearch = this.onSearch.bind(this)
  }

  onSearch(e) {
    if (e.key === 'Enter'){
      e.preventDefault()
      this.props.searchBooks(e.target.value)
    }
  }

  updateBook(book, shelf) {
    this.props.updateBook(book, shelf)
  }

  render() {
    const title = this.props.result.keyword === '' ? "Search for books" :
    `${this.props.result.items.length} matches for "${this.props.result.keyword}"`
    const {books, result} = this.props
    const searchResult = result.items.map(book => books[book.id] || book)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" 
                   placeholder="Search by title or author"
                   onKeyDown={this.onSearch} />
          </div>
        </div>
        <div className="search-books-results">
          <BookShelf title={title}
                     books={searchResult}
                     updateBook={this.props.updateBook} />
        </div>
      </div>
    )
  }
}

export default SearchBooks
