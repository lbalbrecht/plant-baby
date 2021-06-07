const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Plant extends Model {}

Plant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_indoor: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    for_sale: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    // Store a reference of the `id` of inventory this plant belongs to
    inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "inventory",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "plant",
  }
);

module.exports = Plant;
