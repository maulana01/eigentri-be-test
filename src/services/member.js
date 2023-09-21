/** @format */

const models = require('../../models');
const borrowingService = require('./borrowing');
const { Op } = models.Sequelize;

const getAllMembers = async () => {
  try {
    const tempObj = {};
    const members = await models.Member.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    const borrowings = await borrowingService.getAllBorrowings();
    borrowings.forEach((borrowing) => {
      tempObj[borrowing.memberCode] = (tempObj[borrowing.memberCode] || 0) + 1;
    });
    members.forEach((member) => {
      if (tempObj[member.dataValues.code]) {
        member.dataValues.borrowedBooks = tempObj[member.dataValues.code];
      } else {
        member.dataValues.borrowedBooks = 0;
      }
    });
    return members;
  } catch (error) {
    return error;
  }
};

const checkExistingMember = async (memberCode) => {
  try {
    const member = await models.Member.findOne({
      where: {
        code: {
          [Op.eq]: memberCode,
        },
      },
    });
    if (!member) {
      return false;
    }
    return true;
  } catch (error) {
    return error;
  }
};

const checkMemberPenalty = async (memberCode) => {
  try {
    const member = await models.Member.findOne({
      where: {
        code: {
          [Op.eq]: memberCode,
        },
      },
      attributes: ['penalty', 'penaltyUpTo'],
    });
    return member;
  } catch (error) {
    return error;
  }
};

const updateMemberPenalty = async (memberCode, penalty, penaltyUpTo) => {
  try {
    const member = await models.Member.update({ penalty, penaltyUpTo }, { where: { code: memberCode } });
    return member;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllMembers,
  checkExistingMember,
  checkMemberPenalty,
  updateMemberPenalty,
};
