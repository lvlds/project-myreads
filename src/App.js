import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'

import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as Constants from './Constants'

class BooksApp extends React.Component {
  state = {
    searchResult: {
      keyword: '',
      items: []
    },
    books: {}
  }

  constructor(props) {
    super(props)
    this.searchBooks = this.searchBooks.bind(this)
    this.updateBook = this.updateBook.bind(this)
    this.currentlyReading = this.currentlyReading.bind(this)
    this.wantToRead = this.wantToRead.bind(this)
    this.read = this.read.bind(this)
  }

  componentWillMount() {
    BooksAPI.getAll().then(data => {
      const books = data.reduce((accu, item) => {accu[item.id] = item; return accu}, {})
      this.setState({
        books
      })
    })
  }

  currentlyReading() {
    const { books } = this.state
    return Object.keys(books)
      .filter(bookId => books[bookId].shelf === Constants.CurrentlyReading)
      .map(bookId => books[bookId])
  }

  wantToRead() {
    const { books } = this.state
    return Object.keys(books)
      .filter(bookId => books[bookId].shelf === Constants.WantToRead)
      .map(bookId => books[bookId])
  }

  read() {
    const { books } = this.state
    return Object.keys(books)
      .filter(bookId => books[bookId].shelf === Constants.Read)
      .map(bookId => books[bookId])
  }

  searchBooks(keyword) {
    BooksAPI.search(keyword).then(data => {
      const searchResult = {
        keyword: keyword,
        items: [],
      }
      if(!data.error) {
        searchResult.items = data
      }
      this.setState({ searchResult })
    })
  }

  updateBook(book, shelf) {
    const { books } = this.state
    BooksAPI.update(book, shelf).then(data => {
      delete books[book.id]
      const allBooks = data.currentlyReading
        .concat(data.wantToRead)
        .concat(data.read)
        .map(bookId => books[bookId] || BooksAPI.get(bookId))
      Promise.all(allBooks).then(result => {
        const books = result.reduce((accu, item) => {accu[item.id] = item; return accu}, {})
        this.setState({ books })
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={
          props => {
            return (
              <ListBooks
                currentlyReading={this.currentlyReading()}
                wantToRead={this.wantToRead()}
                read={this.read()}
                updateBook={this.updateBook}
              />
            )
        }} />
        <Route path="/search" component={
          props => {
            return (
              <SearchBooks searchBooks={this.searchBooks} 
                           books={this.state.books}
                           result={this.state.searchResult}
                           updateBook={this.updateBook}
              />
            )
          }
        } />
      </div>
    )
  }
}

export default BooksApp
