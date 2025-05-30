export const typeDefs = `#graphql
type Book {
  imgPath: String
  title: String
  author: String
  price: Float
  inStock: Int
}

type Query {
  getBooks: [Book]
}
`;