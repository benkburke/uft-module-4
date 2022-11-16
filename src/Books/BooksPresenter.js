import booksRepository from "./BooksRepository.js";

export default class BooksPresenter {
  load = async (callback) => {
    await booksRepository.getBooks((booksPm) => {
      const booksVm = booksPm.map((bookPm) => {
        return { name: bookPm.name, author: bookPm.author };
      });
      callback(booksVm);
    });
  };

  addBook = async (bookName, bookAuthor) => {
    const bookPm = { name: bookName, author: bookAuthor };
    await booksRepository.addBook(bookPm);
  };
}
