'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Task.belongsTo(models.User, {
        foreignKey: "createdBy", 
        as: "user"               
      });
    }
  }
  Task.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
  },
  createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
  }

  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};