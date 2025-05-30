#BOOK-SHOP-WEBAPP-THREE
## Backend-GraphQL

### Query Examples
- Example 1:
query GetBooks {
  books {
    imgPath
    title
    author
    price
    inStock
  }
}

- Example 2:
query GetSingleBook {
  singleBook(bookId: "6837ece450a373858890a674") {
    imgPath
    title
    author
    price
    inStock
  }
}

- Example 3:
query GetSingleBook($bookId: String) {
  singleBook(bookId: $bookId) {
    imgPath
    title
    author
    price
    inStock
  }
}
Variables:
{ "bookId": "6837ece450a373858890a674" }