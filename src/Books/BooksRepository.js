import httpGateway from "../Shared/HttpGateway.js";
import Observable from "../Shared/Observable";

class BooksRepository {
  programmersModel = null;
  apiUrl = "https://api.logicroom.co/api/pete@logicroom.co/";

  constructor() {
    this.programmersModel = new Observable([]);
  }

  getBooks = async (callback) => {
    this.programmersModel.subscribe(callback);
    await this.loadApiData();
    this.programmersModel.notify();
  };

  addBook = async (bookPm) => {
    // console.log(bookPm);
    let dto = {
      name: bookPm.name,
      author: bookPm.author,
      ownerId: "pete@logicroom.co",
    };

    await httpGateway.post(this.apiUrl + "books", dto);
    await this.loadApiData();
    this.programmersModel.notify();
  };

  deleteBook = async (bookId) => {
    await httpGateway.delete(this.apiUrl + "books" + "/" + bookId);
    await this.loadApiData();
    this.programmersModel.notify();
  };

  loadApiData = async () => {
    const booksDto = await httpGateway.get(this.apiUrl + "books");
    this.programmersModel.value = booksDto.result.map((bookDto) => {
      return bookDto;
    });
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
