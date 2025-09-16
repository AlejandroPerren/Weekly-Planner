import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../connection";
import { Task } from "./Task";

interface UserAttributes {
  dni: string;
  name: string;
  password: string;
  email: string;
}

type UserCreationAttributes = Optional<UserAttributes, "dni">;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public dni!: string;
  public name!: string;
  public password!: string;
  public email!: string;

  static associate() {
    User.hasMany(Task, {
      foreignKey: "createdBy",
      as: "tasks",
    });
  }
}

User.init(
  {
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true, 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);
