import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../connection";
import { Task } from "./task"; 

interface UserAttributes {
  name: string;
  dni: string;
  password: string;
  email: string;
}

type UserCreationAttributes = Optional<UserAttributes, "dni">;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public name!: string;
  public dni!: string;
  public password!: string;
  public email!: string;

  // Relaciones
  static associate() {
    User.hasMany(Task, {
      foreignKey: "createdBy",
      as: "tasks",
    });
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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
  }
);
