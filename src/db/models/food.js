import { DataTypes } from 'sequelize'
import db from '../index'

export default db.define(
  'food',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }
)