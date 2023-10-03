import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Repair = sequelize.define("repair", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    field: "repair_id",
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "cancelled"),
    allowNull: false,
    defaultValue: "pending",
  },
});

export default Repair;
