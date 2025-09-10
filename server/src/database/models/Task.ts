import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../connection";
import { User } from "./user"; 

interface TaskAttributes {
  id: number;
  name: string;
  isActive: boolean;
  createdBy: string; 
}

type TaskCreationAttributes = Optional<TaskAttributes, "id">;

export class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: number;
  public name!: string;
  public isActive!: boolean;
  public createdBy!: string;

  static associate() {
    Task.belongsTo(User, {
      foreignKey: "createdBy",
      as: "user",
    });
  }
}

Task.init(
  {
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
      type: DataTypes.STRING, 
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Task",
    tableName: "Tasks",
  }
);
