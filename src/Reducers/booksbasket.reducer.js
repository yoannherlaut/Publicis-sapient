export default function BooksBasket(books = [], action) {
  if (action.type === 'addBook') {
    return [...books, action.book]
  } else {
    return books;
  }
}
