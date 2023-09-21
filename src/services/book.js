/** @format */

const models = require('../../models');
const borrowingService = require('./borrowing');
const { Op } = models.Sequelize;

const getAllBooks = async () => {
  try {
    const books = await models.Book.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    const borrowings = await borrowingService.getAllBorrowings();
    const borrowedbookCodes = borrowings.map((borrowing) => borrowing.bookCode);
    const availableBooks = books.filter((book) => !borrowedbookCodes.includes(book.code));
    return availableBooks;
  } catch (error) {
    return error;
  }
};

const getBook = async (bookCode) => {
  try {
    const book = await models.Book.findOne({
      where: {
        code: {
          [Op.eq]: bookCode,
        },
      },
    });
    return book;
  } catch (error) {
    return error;
  }
};

const updateBookStock = async (bookCode, stock) => {
  try {
    const book = await models.Book.update({ stock }, { where: { code: bookCode } });
    return book;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllBooks,
  getBook,
  updateBookStock,
};
