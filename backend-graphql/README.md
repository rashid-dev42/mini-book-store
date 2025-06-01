#BOOK-SHOP-WEBAPP-THREE
## Backend-GraphQL

### Query Examples
- Example 1:
query GetBooks {
  books {
    _id
    imgPath
    title
    author
    price
    inStock
  }
}

- Example 2:
query GetBooks {
  books {
    title
    author
    price
  }
}

- Example 3:
query GetSingleBook {
  singleBook(bookId: "6837ece450a373858890a674") {
    _id
    imgPath
    title
    author
    price
    inStock
  }
}

- Example 4:
query GetSingleBook {
  singleBook(bookId: "6837ece450a373858890a674") {
    title
    author
    price
  }
}

- Example 5:
query GetSingleBook($bookId: String) {
  singleBook(bookId: $bookId) {
    _id
    imgPath
    title
    author
    price
    inStock
  }
}
Variables:
{ "bookId": "6837ece450a373858890a674" }

- Example 6:
query GetSingleBook($bookId: String) {
  singleBook(bookId: $bookId) {
    title
    author
    price
  }
}
Variables:
{ "bookId": "6837ece450a373858890a674" }

### Mutation Examples
- Example 7:
mutation AddBook {
  addBook(imgPath: "", title: "Book Six", author: "Author Six", price: 30.19, inStock: 8) {
    message
    isSuccessful
  }
}

- Example 8:
mutation AddBook($imgPath: String, $title: String, $author: String, $price: Float, $inStock: Int) {
  addBook(imgPath: $imgPath, title: $title, author: $author, price: $price, inStock: $inStock) {
    message
    isSuccessful
  }
}
Variables:
{
  "imgPath": "",
  "title": "Book Seven",
  "author": "Author Seven",
  "price": 29.49,
  "inStock": 8
}

- Example 9:
mutation UpdateBook {
  updateBook(bookId: "6837ece450a373858890a674", imgPath: "", title: "Book Two", author: "Author Two", price: 16.49, inStock: 10) {
    message
    isSuccessful
  }
}

- Example 10:
mutation UpdateBook($bookId: String, $imgPath: String, $title: String, $author: String, $price: Float, $inStock: Int) {
  updateBook(bookId: $bookId, imgPath: $imgPath, title: $title, author: $author, price: $price, inStock: $inStock) {
    message
    isSuccessful
  }
}
Variables:
{
  "bookId": "6837ece450a373858890a674",
  "imgPath": "",
  "title": "Book Two",
  "author": "Author Two",
  "price": 16.49,
  "inStock": 8
}