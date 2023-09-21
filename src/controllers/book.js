/** @format */

const bookServices = require('../services/book');
const borrowServices = require('../services/borrowing');
const memberServices = require('../services/member');

const getAllBooks = async (req, res) => {
  try {
    const books = await bookServices.getAllBooks();
    return res.status(200).json({ code: 200, data: books, message: 'All available books successfully retrieved' });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

const borrowBook = async (req, res) => {
  try {
    const checkExistingMember = await memberServices.checkExistingMember(req.body.memberCode);
    if (!checkExistingMember) {
      return res.status(403).json({
        code: 403,
        message: 'The library member with the provided ID does not exist. Please register as a member to borrow books.',
      });
    }
    const checkMemberPenalty = await memberServices.checkMemberPenalty(req.body.memberCode);
    if (checkMemberPenalty.penalty === true) {
      if (new Date().toISOString().split('T')[0] >= checkMemberPenalty.penaltyUpTo) {
        await memberServices.updateMemberPenalty(req.body.memberCode, 0, null);
      } else {
        return res.status(403).json({ code: 403, message: 'You cannot borrow books at the moment due to an existing penalty.' });
      }
    }
    const countBorrowedBooks = await borrowServices.countMemberBorrowedBooks(req.body.memberCode);
    if (countBorrowedBooks == 2) {
      return res.status(403).json({ code: 403, message: 'You cannot borrow more than 2 books.' });
    }
    const getBook = await bookServices.getBook(req.body.bookCode);
    if (!getBook) {
      return res.status(403).json({ code: 403, message: 'The book with the provided ID does not exist.' });
    }
    if (getBook.stock == 0) {
      return res.status(403).json({ code: 403, message: 'The book with the provided ID is out of stock. Please borrow another book.' });
    }
    const checkBorrowedBookStatus = await borrowServices.checkBorrowedBookStatus(req.body.memberCode, req.body.bookCode);
    if (checkBorrowedBookStatus) {
      return res.status(403).json({
        code: 403,
        message: "Oops! It looks like you've already borrowed this book. Please return it before you can borrow it again.",
      });
    }
    await borrowServices.borrowBook(req.body.memberCode, req.body.bookCode);
    await bookServices.updateBookStock(req.body.bookCode, getBook.stock - 1);
    return res.status(200).json({ code: 200, message: 'Book successfully borrowed. Enjoy your reading!' });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const getBorrowedBookData = await borrowServices.getBorrowedBookData(req.body.memberCode, req.body.bookCode);
    const getBook = await bookServices.getBook(req.body.bookCode);
    if (!getBorrowedBookData) {
      return res.status(403).json({ code: 403, message: 'Oops! It looks like you have not borrowed this book.' });
    }
    if (new Date().toISOString().split('T')[0] > getBorrowedBookData.returnDate) {
      await memberServices.updateMemberPenalty(req.body.memberCode, true, new Date(new Date().setDate(new Date().getDate() + 3)));
      await borrowServices.returnBook(req.body.memberCode, req.body.bookCode);
      await bookServices.updateBookStock(req.body.bookCode, getBook.stock + 1);
      return res.status(200).json({
        code: 200,
        message: 'Oops! It looks like you have returned the book past the due date. You will not be able to borrow books for the next 3 days.',
      });
    }
    await borrowServices.returnBook(req.body.memberCode, req.body.bookCode);
    await bookServices.updateBookStock(req.body.bookCode, getBook.stock + 1);
    return res.status(200).json({ code: 200, message: 'Book successfully returned. Thank you for returning the book on time.' });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

module.exports = {
  getAllBooks,
  borrowBook,
  returnBook,
};
