import mongoose from "mongoose";
import { Book } from "./model/bookModel.js";

type Response = {
  message: String
  isSuccessful: Boolean
};

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
  },
  Mutation: {
    addBook: async (parent, args) => {
      const response: Response = {
        message: "",
        isSuccessful: true
      }

      try {
        const { imgPath, title, author, price, inStock } = args;
        await mongoose.connect("mongodb://127.0.0.1:27017/bookShopThreeDB");
        const newBook = new Book({
          imgPath,
          title,
          author,
          price,
          inStock
        });
        await newBook.save();
        await mongoose.connection.close();
        response.message = "Successfully added";
        response.isSuccessful = true;
      } catch(error) {
        response.message = error.message;
        response.isSuccessful = false;
      }

      return response;
    },
    updateBook: async (parent, args) => {
      const response: Response = {
        message: "",
        isSuccessful: true
      };

      try {
        const { bookId, imgPath, title, author, price, inStock } = args;
        await mongoose.connect("mongodb://127.0.0.1:27017/bookShopThreeDB");
        const result = await Book.updateOne({ _id: bookId }, {
          imgPath: imgPath,
          title: title,
          author: author,
          price: price,
          inStock: inStock
        });
        await mongoose.connection.close();
        if (result.modifiedCount === 0) {
          response.message = `The book having bookId ${bookId} was not found`;
          response.isSuccessful = false;
        } else {
          response.message = "Successfully updated";
          response.isSuccessful = true;
        }
      } catch(error) {
        response.message = error.message;
        response.isSuccessful = false;
      }

      return response;
    },
    deleteBook: async (parent, args) => {
      const response: Response = {
        message: "",
        isSuccessful: true
      }

      try {
        const { bookId } = args;
        await mongoose.connect("mongodb://127.0.0.1:27017/bookShopThreeDB");
        const result = await Book.deleteOne({ _id: bookId });
        await mongoose.connection.close();
        if (result.deletedCount === 0) {
          response.message = `The book having bookId ${bookId} was not found`;
          response.isSuccessful = false;
        } else {
          response.message = "Successfully deleted";
          response.isSuccessful = true;
        }
      } catch(error) {
        response.message = error.message;
        response.isSuccessful = false;
      }

      return response;
    }
  }
};