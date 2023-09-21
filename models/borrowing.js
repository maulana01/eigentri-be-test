/** @format */

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Borrowing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Book, {
        foreignKey: 'bookCode',
        targetKey: 'code',
        as: 'book',
      });
      this.belongsTo(models.Member, {
        foreignKey: 'memberCode',
        targetKey: 'code',
        as: 'member',
      });
    }
  }
  Borrowing.init(
    {
      bookCode: DataTypes.STRING,
      memberCode: DataTypes.STRING,
      borrowDate: DataTypes.DATEONLY,
      returnDate: DataTypes.DATEONLY,
      isReturned: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Borrowing',
    }
  );
  return Borrowing;
};

