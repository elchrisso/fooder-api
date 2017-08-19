import { DataTypes } from 'sequelize'
import db from '../index'

export default db.define(
  'profile',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    fullName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    fullAddress: {
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }
)