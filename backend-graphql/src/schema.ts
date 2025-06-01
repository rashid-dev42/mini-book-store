export const typeDefs = `#graphql
  type Book {
    _id: String
    imgPath: String
    title: String
    author: String
    price: Float
    inStock: Int
  }

  type Query {
    books: [Book]
    singleBook(bookId: String): Book
  }

  type Response {
    message: String
    isSuccessful: Boolean
  }

  type Mutation {
    addBook(imgPath: String, title: String, author: String, price: Float, inStock: Int): Response
    updateBook(bookId: String, imgPath: String, title: String, author: String, price: Float, inStock: Int): Response
  }
`;