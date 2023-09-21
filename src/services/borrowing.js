/** @format */

const models = require('../../models');
const { Op } = models.Sequelize;

const getAllBorrowings = async () => {
  try {
    const borrowings = await models.Borrowing.findAll();
    return borrowings;
  } catch (error) {
    return error;
  }
};

const countMemberBorrowedBooks = async (memberCode) => {
  try {
    const borrowings = await models.Borrowing.count({
      where: {
        memberCode: {
          [Op.eq]: memberCode,
        },
        isReturned: {
          [Op.eq]: false,
        },
      },
    });
    return borrowings;
  } catch (error) {
    return error;
  }
};

const borrowBook = async (memberCode, bookCode) => {
  try {
    const borrow = await models.Borrowing.create({
      bookCode,
      memberCode,
      borrowDate: new Date(),
      returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      isReturned: false,
    });
    return borrow;
  } catch (error) {
    return error;
  }
};

const returnBook = async (memberCode, bookCode) => {
  try {
    const returnBook = await models.Borrowing.update(
      {
        memberCode,
        bookCode,
        isReturned: true,
      },
      {
        where: {
          bookCode: {
            [Op.eq]: bookCode,
          },
          memberCode: {
            [Op.eq]: memberCode,
          },
          isReturned: {
            [Op.eq]: false,
          },
        },
      }
    );
  } catch (error) {
    return error;
  }
};

const getBorrowedBookData = async (memberCode, bookCode) => {
  try {
    const getBorrowedBookData = await models.Borrowing.findOne({
      where: {
        memberCode: {
          [Op.eq]: memberCode,
        },
        bookCode: {
          [Op.eq]: bookCode,
        },
        isReturned: {
          [Op.eq]: false,
        },
      },
    });
    return getBorrowedBookData;
  } catch (error) {
    return error;
  }
};

const checkBorrowedBookStatus = async (memberCode, bookCode) => {
  try {
    const checkBorrowedBookStatus = await models.Borrowing.findOne({
      where: {
        memberCode: {
          [Op.eq]: memberCode,
        },
        bookCode: {
          [Op.eq]: bookCode,
        },
        isReturned: {
          [Op.eq]: false,
        },
      },
    });
    if (!checkBorrowedBookStatus) {
      return false;
    }
    return true;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllBorrowings,
  countMemberBorrowedBooks,
  borrowBook,
  returnBook,
  getBorrowedBookData,
  checkBorrowedBookStatus,
};
