import mongoose from "mongoose";
import { Book } from "./model/bookModel.js";

export const resolvers = {
  Query: {
    books: async () => {
      await mongoose.connect("mongodb://127.0.0.1:27017/bookShopThreeDB");
      const result = await Book.find();
      await mongoose.connection.close();
      return result;
    },
    singleBook: async (parent, args) => {
      const { bookId } = args;
      await mongoose.connect("mongodb://127.0.0.1:27017/bookShopThreeDB");
      const result = await Book.findOne({ _id: bookId });
      await mongoose.connection.close();
      return result;
    }
  }
};