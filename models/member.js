/** @format */

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Borrowing, {
        foreignKey: 'memberCode',
        as: 'borrowing',
      });
    }
  }
  Member.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      penalty: DataTypes.BOOLEAN,
      penaltyUpTo: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'Member',
    }
  );
  return Member;
};
