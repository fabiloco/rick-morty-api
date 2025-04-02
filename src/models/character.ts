import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./database";

interface CharacterAttributes {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  image: string;
}

interface CharacterCreationAttributes extends Optional<CharacterAttributes, "id"> {}

class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes {
  public id!: number;
  public name!: string;
  public status!: string;
  public species!: string;
  public gender!: string;
  public origin!: string;
  public image!: string;
}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    species: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "characters",
    timestamps: false
  }
);

export { Character };
