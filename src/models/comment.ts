import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/database';

export class Comment extends Model {
  declare id: number;
  declare characterId: number;
  declare text: string;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: 'comments',
    timestamps: true,
  }
);
