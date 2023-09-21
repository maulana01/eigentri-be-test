/** @format */

const service = require('../services/member');

const getAllMembers = async (req, res) => {
  try {
    const members = await service.getAllMembers();
    return res.status(200).json({ code: 200, data: members, message: 'All members successfully retrieved' });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

module.exports = {
  getAllMembers,
};
